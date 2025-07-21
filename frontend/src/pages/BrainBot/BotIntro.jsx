import { useNavigate } from "react-router-dom";
import StarIcon from "@/assets/icons/starsAI.svg";
import MessageInput from "./MessageInput";
import { useUser } from "@/context/useUser";

export default function BotIntro() {
  const navigate = useNavigate();
  const { userDetails } = useUser();
  const handleSend = (message) => {
  if (!message.trim()) return;
  navigate("/dashboard/bot/chat", {
    state: {
      initialMessage: message,
      fromMoodResult: false,
    },
  });
};

  return (
    <div className="flex flex-col max-w-3xl overflow-hidden mx-auto">
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
        <div className="w-full flex flex-col items-center text-center justify-center space-y-4 pt-16 pb-8">
          <img src={StarIcon} alt="BrainBot Icon" className="w-10 h-10" />
          <h1 className="text-lg font-semibold text-slate-600">
            Hello{userDetails?.firstName ? `, ${userDetails.firstName}` : "there"}
          </h1>
          <p className="text-xl font-bold text-slate-800">Ask BrainBot about anything</p>
          <p className="text-sm text-zinc-500 max-w-sm">
            Talk about your feelings, get suggestions, and explore mental wellness.
          </p>
        </div>
      </div>
      <footer className="bottom-0 fixed bg-white/50 backdrop-blur-md pt-2 pb-4 px-0 border-t border-zinc-200 z-10 w-96 sm:max-w-3xl sm:w-full mx-auto">
        <div className="flex flex-wrap justify-center sm:mb-4 mb-6 gap-2">
          {["I feel overwhelmed lately", "Give me some journaling ideas", "Suggest calming exercises"].map((text, index) => (
            <button
              key={index}
              onClick={() => handleSend(text)}
              className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100/70 rounded-full hover:bg-purple-200 transition border border-purple-200">
              {text}
            </button>
          ))}
        </div>
        <div className="relative">
          <MessageInput onSend={handleSend} />
        </div>
      </footer>
    </div>
  );
}





// mt-[332px] sm:mt-[380px]