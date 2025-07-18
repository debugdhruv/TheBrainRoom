import BotIcon from "@/assets/icons/starsAI.svg";
import ReactMarkdown from "react-markdown";

export default function ChatBubble({ type, text, title, description, url, image, source }) {

  const isUser = type === "user";
  if (type === "card") {
    return (
      <div className="w-full flex justify-start px-2">
        <a
          href={url}
          data-bot-link
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all block"
        >
          {image && (
            <img src={image} alt="Suggestion Thumbnail" className="w-full h-40 object-cover" />
          )}
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <img src={BotIcon} alt="Bot" className="h-4 w-4" />
              <span className="text-xs text-zinc-500">BrainBot</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
            <p className="text-xs text-zinc-600">{description}</p>
            {source && (
              <p className="text-xs text-purple-600 font-medium">{`View on ${source}`}</p>
            )}
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} px-2`}>
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm px-4 py-3 rounded-xl shadow-sm ${
          isUser
            ? "bg-purple-600 text-white rounded-br-none"
            : "bg-zinc-100 text-slate-700 rounded-bl-none"
        }`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <img src={BotIcon} alt="Bot" className="h-4 w-4" />
            <span className="text-xs text-zinc-500">BrainBot</span>
          </div>
        )}
        <ReactMarkdown
          components={{
            p: ({ ...props }) => <p className="prose prose-sm max-w-none whitespace-pre-wrap" {...props} />,
            strong: ({ ...props }) => <strong className="font-semibold text-slate-700" {...props} />,
            a: ({ ...props }) => (
              <a className="underline" target="_blank" rel="noopener noreferrer" {...props} />
            )
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}