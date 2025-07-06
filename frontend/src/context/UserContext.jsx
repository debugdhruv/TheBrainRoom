import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserDetails(data.user);
        } else {
          console.error("❌ Failed to load profile:", data.message);
        }
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);
  const clearUserDetails = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("user_xp");
    localStorage.removeItem("xp_history");
    // localStorage.removeItem("lastLoginXP");
    setUserDetails(null);
  };

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, clearUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};