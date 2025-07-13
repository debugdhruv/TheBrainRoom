import { createContext, useState, useEffect } from "react";
import { useUser } from "./useUser";
import { toast } from "sonner";

const XPContext = createContext();
export { XPContext };

export const XPProvider = ({ children }) => {
  const { userDetails, setUserDetails } = useUser();

  const [xp, setXP] = useState(0);
  const [history, setHistory] = useState([]);

useEffect(() => {
  if (userDetails) {
    setXP(userDetails.xp || 0);
    setHistory(userDetails.xpHistory || []);
  } else {
    setXP(0);
    setHistory([]);
  }
}, [userDetails?._id]);

const addXP = async (amount, reason, oncePerDay = false) => {
  const date = new Date().toISOString().split("T")[0];
  const updatedXP = xp + amount;
  const updatedHistory = [
    { date, action: reason, points: amount },
    ...history.slice(0, 19)
  ];

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
      // Only update locally if backend confirms XP was added
      setXP(updatedXP);
      setHistory(updatedHistory);
      setUserDetails((prev) => ({
        ...prev,
        xp: updatedXP,
        xpHistory: updatedHistory,
      }));

      toast.success(`+${amount} XP for ${reason}`, {
        position: "top-center",
        duration: 2000,
      });
    } else {
      console.log("ℹ️ XP not added (already exists for today or server rejected)");
    }
  } catch (err) {
    console.error("❌ Failed to persist XP:", err);
  }
};

  return (
    <XPContext.Provider value={{ xp, history, addXP }}>
      {children}
    </XPContext.Provider>
  );
};