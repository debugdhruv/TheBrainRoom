import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleRedirect = () => {
    navigate(isLoggedIn ? "/dashboard" : "/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      <div className="relative mb-4">
        <p className="text-[120px] sm:text-[200px] md:text-[300px] lg:text-[400px] xl:text-[500px] font-normal animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">
          404
        </p>
      </div>
      <div className="z-10 text-center">
        <p className="text-zinc-500 text-md mb-4">
          You’ve clearly taken the scenic route...<br />there's nothing here, buddy 👀
        </p>
        <button
          onClick={handleRedirect}
          className="inline-block px-6 py-3 bg-purple-700 text-white rounded-full hover:bg-purple-600 transition"
        >
          Take Me Home
        </button>
      </div>
    </div>
  );
}