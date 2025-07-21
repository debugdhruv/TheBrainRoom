import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { XPContext } from "@/context/XPContext";
import { toast } from "sonner";

const Premium = () => {
  const { xp, userType, setUserType } = useContext(XPContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <div className="relative min-h-screen text-gray-800 px-6 py-12 flex flex-col items-center justify-center">
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
        className={`${
          !isUnlocked ? "blur-sm opacity-30 pointer-events-none select-none" : ""
        } transition-all duration-500 max-w-3xl text-center`}
      >
        <h1 className="text-5xl font-extrabold mb-6 text-purple-800">
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

      {/* Contact Form Section */}
      <div className="mt-20 w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-slate-800">📬 Contact Us</h3>
        <form
          onSubmit={() => {
            setIsSubmitting(true);
          }}
          action="https://formspree.io/f/mrblerlp"
          method="POST"
          className="flex flex-col space-y-4"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            name="message"
            required
            rows="4"
            placeholder="Your Message"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending message..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Premium;
