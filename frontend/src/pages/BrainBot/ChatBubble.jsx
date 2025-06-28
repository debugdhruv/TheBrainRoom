import BotIcon from "@/assets/icons/starsAI.svg";

export default function ChatBubble({ type, text }) {
  const isUser = type === "user";

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} px-2`}>
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm px-4 py-3 rounded-xl shadow-sm ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none"
            : "bg-zinc-100 text-slate-700 rounded-bl-none"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <img src={BotIcon} alt="Bot" className="h-4 w-4" />
            <span className="text-xs text-zinc-500">BrainBot</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
}