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
    <div className="w-full py-2">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center border border-zinc-300 rounded-full px-4 py-2 bg-white">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none text-sm bg-transparent outline-none"
          />
          <button
            onClick={handleSend}
            className="hover:bg-zinc-100 rounded-full transition"
          >
            <img src={SendIcon} alt="Send" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}