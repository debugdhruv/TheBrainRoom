import { useState } from "react";
import StarIcon from "@/assets/icons/starsAI.svg";
import MessageInput from "./MessageInput";
import BotChat from "./BotChat";

const suggestions = [
  "I feel overwhelmed lately",
  "How can I sleep better?",
  "Give me some journaling ideas",
  "Suggest calming exercises",
];

export default function BotIdle() {
  const [started, setStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const handleStart = (text) => {
    if (!text.trim()) return;
    setInitialMessage(text.trim());
    setStarted(true);
  };

  if (started) {
    return <BotChat initialMessage={initialMessage} />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-full max-w-2xl mx-auto px-4 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col items-center space-y-3 mb-8">
        <img src={StarIcon} alt="Bot Icon" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-slate-800 text-center">Ask BrainBot anything</h1>
        <p className="text-sm text-zinc-500 text-center max-w-sm">
          Talk about your feelings, ask for suggestions or just vent.
        </p>
      </div>

      {/* Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-10">
        {suggestions.map((text, index) => (
          <button
            key={index}
            onClick={() => handleStart(text)}
            className="px-4 py-2 text-sm border border-zinc-300 rounded-lg bg-white hover:bg-zinc-50 shadow-sm transition"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Input */}
      <MessageInput onSend={handleStart} />
    </div>
  );
}