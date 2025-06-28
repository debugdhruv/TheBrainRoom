import { useState } from "react";
import SendIcon from "@/assets/icons/send.svg";

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full border-t border-zinc-200 px-4 py-3 bg-white">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="w-full resize-none text-sm border border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSend}
          className="p-2 hover:bg-zinc-100 rounded-full transition"
        >
          <img src={SendIcon} alt="Send" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}