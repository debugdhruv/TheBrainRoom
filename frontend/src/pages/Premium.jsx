import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { XPContext } from "@/context/XPContext";
import { toast } from "sonner";

const Premium = () => {
  const { xp, userType, setUserType } = useContext(XPContext);
  const isEligible = xp >= 2000;
  const isUnlocked = userType === "premium";

  const handleUnlock = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_APP_BASE_URL;

      const res = await fetch(`${baseUrl}/api/profile/unlock-premium`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const data = await res.json();
      console.log("Unlock Premium Response:", data);

      if (res.ok) {
        setUserType("premium");
        toast.success("✨ Premium Access Unlocked!");
      } else {
        toast.error("Failed to unlock premium.");
      }
    } catch (err) {
      console.error("Unlock error:", err);
    }
  };

  const shouldShowPopup = !isUnlocked;

  return (
    <div className="relative text-gray-800 px-6 py-12 flex flex-col items-center justify-center">
      {shouldShowPopup && (
        <div className="absolute inset-0 backdrop-blur-sm bg-black/40 z-20 flex items-center justify-center px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              {isEligible
                ? "🎉 Congratulations, you're eligible to unlock this!"
                : "🔒 Premium content is locked"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isEligible
                ? "Tap below to unlock access to exclusive offline workshops and networking resources."
                : "Reach 2000 XP to unlock exclusive offline workshops and networking resources."}
            </p>
            {isEligible && !isUnlocked && (
              <Button onClick={handleUnlock} className="w-full">
                Unlock Premium Access
              </Button>
            )}
          </div>
        </div>
      )}

      <div
        className={`${!isUnlocked ? "blur-sm opacity-30 pointer-events-none select-none" : ""
          } transition-all duration-500 max-w-3xl text-center`}
      >
        <h1 className="text-5xl font-extrabold mb-6 text-cyan-800">
          🌟 BrainRoom Premium
        </h1>
        <p className="text-lg text-gray-700 mb-10 px-4">
          Welcome to the Premium tier of The Brain Room — a serene space
          dedicated to your growth and connection. As a premium member, you
          unlock access to:
        </p>
        <ul className="text-gray-700 space-y-6 text-xl list-disc list-inside px-6 text-left">
          <li>🧘‍♀️ Exclusive offline workshops</li>
          <li>🤝 Networking resources</li>
        </ul>
      </div>
    </div>
  );
};

export default Premium;
