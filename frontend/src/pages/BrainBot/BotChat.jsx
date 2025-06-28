import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import BotReportCard from "./BotReportCard";
import StarIcon from "@/assets/icons/starsAI.svg";

const suggestions = [
  "I feel overwhelmed lately",
  "How can I sleep better?",
  "Give me some journaling ideas",
  "Suggest calming exercises",
];

export default function BotChat({ initialMessage, moodReport = null, fromMoodResult = false }) {
  const [messages, setMessages] = useState(initialMessage ? [{ type: "user", text: initialMessage }] : []);
  const showReport = fromMoodResult;
  const [started, setStarted] = useState(!!initialMessage);

  useEffect(() => {
    if (initialMessage) {
      const msg = { type: "user", text: initialMessage };
      const botReply = {
        type: "bot",
        text: "Thanks for sharing! Let's work through this together. 💬",
      };

      setMessages([msg, botReply]);
    }
  }, [initialMessage]);

  const handleSend = (newText) => {
    if (!newText.trim()) return;
    const updated = [...messages, { type: "user", text: newText }];
    setMessages(updated);

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Got it! Here’s something you can try...",
        },
      ]);
    }, 900);

    if (!started) setStarted(true);
  };

  const handleSuggestionClick = (text) => {
    handleSend(text);
    setStarted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-28 pt-10 space-y-6">
      {/* Suggestions UI */}
      {!started && (
        <div className="flex flex-col items-center text-center space-y-6">
          <img src={StarIcon} alt="BrainBot Icon" className="w-10 h-10" />
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Ask BrainBot anything</h1>
            <p className="text-sm text-zinc-500 max-w-xs mx-auto">
              Talk about your feelings, ask for suggestions or just vent.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="px-4 py-2 text-sm border border-zinc-300 rounded-lg bg-white hover:bg-zinc-50 shadow-sm transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mood Report (only if visible + started) */}
      {showReport && moodReport && started && (
        <BotReportCard mood={moodReport.mood} score={moodReport.score} />
      )}
  

      {/* Chat Bubbles */}
      {started && (
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} type={msg.type} text={msg.text} />
          ))}
        </div>
      )}

      {/* Input */}
      <MessageInput
        onSend={(msg) => {
          handleSend(msg);
        }}
      />
    </div>
  );
}