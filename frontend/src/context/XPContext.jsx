import { createContext, useState, useEffect } from "react";
import { toast } from "sonner";

const XPContext = createContext();
export { XPContext };

export const XPProvider = ({ children }) => {
  const [xp, setXP] = useState(() => {
    const stored = localStorage.getItem("user_xp");
    return stored ? parseInt(stored) : 0;
  });

  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem("xp_history");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("user_xp", xp);
    localStorage.setItem("xp_history", JSON.stringify(history));
  }, [xp, history]);

  const addXP = (amount, reason) => {
    const date = new Date().toISOString().split("T")[0];

    setXP((prev) => prev + amount);
    setHistory((prev) => [
      { date, action: reason, points: amount },
      ...prev.slice(0, 19),
    ]);

    toast.success(`+${amount} XP for ${reason}`, {
  position: "top-center",
  duration: 2000,
});
  };

  return (
    <XPContext.Provider value={{ xp, history, addXP }}>
      {children}
    </XPContext.Provider>
  );
};