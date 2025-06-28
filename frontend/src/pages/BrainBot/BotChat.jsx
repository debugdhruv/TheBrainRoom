import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import BotReportCard from "./BotReportCard";

export default function BotChat({ initialMessage = "", moodReport = null }) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // 👇 Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 👇 Trigger first AI reply if initialMessage exists
  useEffect(() => {
    if (initialMessage) {
      const userMsg = { type: "user", text: initialMessage };
      const botReply = {
        type: "bot",
        text: `Thanks for sharing. Let's talk about "${initialMessage}"`,
      };

      setMessages([userMsg, botReply]);
    }
  }, [initialMessage]);

  const handleSend = (text) => {
    const userMsg = { type: "user", text };
    const botReply = {
      type: "bot",
      text: "That's interesting. Tell me more...",
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-32 pt-10 space-y-6">
      {/* Report Card (if coming from Mood Result) */}
      {moodReport && (
        <BotReportCard score={moodReport.score} mood={moodReport.mood} />
      )}

      {/* Chat Messages */}
      {messages.map((msg, idx) => (
        <ChatBubble key={idx} type={msg.type} text={msg.text} />
      ))}

      {/* Chat Input */}
      <MessageInput onSend={handleSend} />

      {/* Invisible div to auto-scroll into view */}
      <div ref={bottomRef} />
    </div>
  );
}