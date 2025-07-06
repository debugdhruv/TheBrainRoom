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
    }
  }, [userDetails]);

  const addXP = async (amount, reason) => {
    const date = new Date().toISOString().split("T")[0];
    const updatedXP = xp + amount;
    const updatedHistory = [
      { date, action: reason, points: amount },
      ...history.slice(0, 19)
    ];

    setXP(updatedXP);
    setHistory(updatedHistory);

    // Update local userDetails context for instant frontend update
    setUserDetails(prev => ({
      ...prev,
      xp: updatedXP,
      xpHistory: updatedHistory,
    }));

    toast.success(`+${amount} XP for ${reason}`, {
      position: "top-center",
      duration: 2000,
    });

    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;

      await fetch(`${baseUrl}/api/profile/xp`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, reason }),
      });
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