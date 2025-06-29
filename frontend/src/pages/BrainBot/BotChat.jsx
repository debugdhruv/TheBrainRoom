import { useEffect, useRef, useState } from "react";
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
  const [isBotTyping, setIsBotTyping] = useState(false);

  const scrollRef = useRef(null);

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

    setIsBotTyping(true);

    // Scroll immediately when bot starts typing
    const el = scrollRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }

    // Simulate bot reply after 2 seconds (randomly card or text)
    setTimeout(() => {
      const shouldSendCard = Math.random() < 0.5;

      if (shouldSendCard) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "card",
            title: "5-Minute Breathing Exercise",
            description: "Follow this short video to relax your body and calm your mind.",
            image: "https://img.youtube.com/vi/odADwWzHR24/hqdefault.jpg",
            url: "https://www.youtube.com/watch?v=odADwWzHR24",
            source: "YouTube"
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Thanks for sharing. Let’s work through this together 💬",
          },
        ]);
      }

      setIsBotTyping(false);
    }, 2000);

    if (!started) setStarted(true);
  };

  const handleSuggestionClick = (text) => {
    handleSend(text);
    setStarted(true);
  };

  const handleScroll = () => {
    // intentionally left blank; logic handled in useEffect now
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      {/* Scrollable chat area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
      >
        {/* Suggestions */}
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

        {/* Mood report card as user-side attachment */}
        {showReport && moodReport && started && (
          <div className="w-full flex justify-end px-2">
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full bg-purple-100 border border-purple-200 rounded-xl overflow-hidden shadow-sm">
              <span className="absolute top-2 right-2 text-[10px] font-bold text-purple-500 bg-purple-200 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                Confidential
              </span>
              <div className="bg-purple-200 px-4 py-2">
                <p className="text-xs font-bold text-purple-800">Today’s Mood Check</p>
                <p className="text-[10px] text-purple-700">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="p-4">
                <p className="text-xs text-purple-900 font-medium">
                  Assessing your mental health report...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Chat messages */}
        {started && (
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <ChatBubble
                key={idx}
                type={msg.type}
                text={msg.text}
                title={msg.title}
                description={msg.description}
                image={msg.image}
                url={msg.url}
                source={msg.source}
              />
            ))}
            {isBotTyping && (
              <div className="w-full flex justify-start px-2">
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm px-4 py-3 rounded-xl shadow-sm bg-zinc-100 text-slate-700 rounded-bl-none">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={StarIcon} alt="Bot" className="h-4 w-4" />
                    <span className="text-xs text-zinc-500">BrainBot</span>
                  </div>
                  <p className="animate-pulse">BrainBot is thinking...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Message input always visible */}
      <div className="px-4 mb-14">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}