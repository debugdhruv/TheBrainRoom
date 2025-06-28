import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import BotReportCard from "./BotReportCard";

export default function BotChat({ initialMessage }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const moodReport = location.state?.moodReport;

  useEffect(() => {
    // If user came from MoodResult, show report card
    if (location.state?.fromMoodResult) {
      setShowReport(true);
    }

    // Inject the first user message
    if (initialMessage) {
      setMessages([{ type: "user", text: initialMessage }]);

      // Simulate AI response after delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Thanks for sharing! Let's work through this together. 💬",
          },
        ]);
      }, 800);
    }
  }, [initialMessage, location.state]);

  const handleSend = (newText) => {
    if (!newText.trim()) return;

    // Push user message
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
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-28 pt-10 space-y-6">
      {showReport && moodReport && (
        <BotReportCard mood={moodReport.mood} score={moodReport.score} />
      )}

      {/* Chat Messages */}
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} type={msg.type} text={msg.text} />
        ))}
      </div>

      {/* Input Field */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}