import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isSessionValid } from "@/utils/session";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSessionValid()) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("loginTimestamp");
  // localStorage.removeItem("lastLoginXP");
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;