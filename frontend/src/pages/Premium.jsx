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
    <div className="relative sm:top-52 h-auto px-6 py-20 flex items-center justify-center overflow-hidden">
      {shouldShowPopup && (
        <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center px-4">
          <div className="bg-white/70 backdrop-blur-md border border-white/30 p-8 rounded-xl shadow-2xl text-center max-w-md mx-auto animate-fade-in transition-all">
            <h2 className="text-2xl font-bold mb-3 text-cyan-900">
              {isEligible
                ? "🎉 You're eligible to go Premium!"
                : "🔒 Premium content is locked"}
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              {isEligible
                ? "Unlock exclusive access to offline workshops and networking now."
                : "Reach 2000 XP to unlock offline workshops and networking resources."}
            </p>
            {isEligible && !isUnlocked && (
              <Button
                onClick={handleUnlock}
                className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-semibold"
              >
                Unlock Premium Access
              </Button>
            )}
          </div>
        </div>
      )}

      <div
        className={`transition-all duration-500 ease-in-out max-w-4xl w-full px-6 text-center ${!isUnlocked ? "blur-sm opacity-30 pointer-events-none select-none" : ""
          }`}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-cyan-800 animate-slide-up">
          🌟 BrainRoom Premium
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10">
          Welcome to the premium tier of The Brain Room — a serene space
          dedicated to your growth and connection.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl border border-cyan-100 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-cyan-700 mb-2">
              🧘‍♀️ Exclusive Offline Workshops
            </h3>
            <p className="text-sm text-gray-600">
              Join focused offline events designed to enhance your wellbeing and skills.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl border border-cyan-100 transition-transform hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-cyan-700 mb-2">
              🤝 Networking Resources
            </h3>
            <p className="text-sm text-gray-600">
              Connect with likeminded individuals and open new doors through exclusive groups.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
