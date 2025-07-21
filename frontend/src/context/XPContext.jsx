import { createContext, useState, useEffect } from "react";
import { useUser } from "./useUser";
import { toast } from "sonner";

const XPContext = createContext();
export { XPContext };

export const XPProvider = ({ children }) => {
  const { userDetails, setUserDetails } = useUser();

  const [xp, setXP] = useState(0);
  const [history, setHistory] = useState([]);

  const [userType, setUserType] = useState("normal");

  useEffect(() => {
    if (userDetails) {
      setXP(userDetails.xp || 0);
      setUserType(userDetails.type || "normal"); // <- add this
    }
  }, [userDetails]);

  // const xpCache = new Set(); // Local cache to track daily XP actions

  useEffect(() => {
    if (userDetails) {
      setXP(userDetails.xp || 0);
      setHistory(userDetails.xpHistory || []);
    } else {
      setXP(0);
      setHistory([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails?._id]);

  const addXP = async (amount, reason, oncePerDay = false) => {
    const today = new Date().toISOString().split("T")[0];

    // Check if XP already given for today for this action
    if (oncePerDay) {
      const alreadyGiven = history.some(
        (entry) => entry.date === today && entry.action === reason
      );
      if (alreadyGiven) {
        console.log("⚠️ XP already given today for:", reason);
        return; // ⛔ Skip call and toast
      }
    }

    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;

      const res = await fetch(`${baseUrl}/api/profile/xp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ amount, reason, oncePerDay }),
      });

      const data = await res.json();

      if (res.ok && data && data.success) {
        const updatedXP = data.xp;
        const updatedHistory = data.xpHistory;

        setXP(updatedXP);
        setHistory(updatedHistory);
        setUserDetails((prev) => ({
          ...prev,
          xp: updatedXP,
          xpHistory: updatedHistory,
        }));

        // ✅ Only show toast if it was newly awarded
        if (!oncePerDay || data.message !== "XP already awarded today") {
          toast.success(`+${amount} XP for ${reason}`, {
            position: "top-center",
            duration: 2000,
          });
        }
      } else {
        console.log("ℹ️ XP not added by server");
      }
    } catch (err) {
      console.error("❌ Failed to persist XP:", err);
    }
  };

  return (
    <XPContext.Provider value={{ xp, history, addXP, userType, setUserType }}>
      {children}
    </XPContext.Provider>
  );
};