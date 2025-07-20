import { useEffect, useRef, useState, useCallback } from "react";
import { useUser } from "@/context/useUser";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import StarIcon from "@/assets/icons/starsAI.svg";
import { useXP } from "@/context/useXP";
import { fetchBrainBotReply } from "@/api/brainbot";
import BotIntro from "./BotIntro.jsx";

export default function BotChat({ initialMessage, moodReport = null, fromMoodResult = false, onUserStart }) {
  const { addXP } = useXP();
  const { userDetails } = useUser();
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef(null);
  const endRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);

  const showReport = fromMoodResult;

  useEffect(() => {
    if (initialMessage && !started) {
      handleSend(initialMessage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // Hide suggestions if fromMoodResult becomes true
  useEffect(() => {
    if (fromMoodResult) {
      setShowSuggestions(false);
    }
  }, [fromMoodResult]);

  const handleSend = useCallback(async (text) => {
    if (!text.trim()) return;
    if (isBotTyping) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    setMessages((prev) => [...prev, { type: "user", text }]);
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }
    setIsBotTyping(true);
    setStarted(true);
    setShowSuggestions(false);
    if (onUserStart) onUserStart(text);

    // Special handling for "Hi"
    if (text.trim().toLowerCase() === "hi") {
      setMessages((prev) => [
        ...prev,
        {
          type: "card",
          title: "5-Minute Breathing Exercise",
          description: "Follow this short video to relax your body and calm your mind.",
          image: "https://img.youtube.com/vi/odADwWzHR24/hqdefault.jpg",
          url: "https://www.youtube.com/watch?v=odADwWzHR24",
          source: "YouTube"
        }
      ]);
      if (scrollRef.current) {
        setTimeout(() => {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
      }
      setIsBotTyping(false);
      return;
    }

    try {
      const reply = await fetchBrainBotReply(text);
      setMessages((prev) => [...prev, { type: "bot", text: reply }]);
      if (scrollRef.current) {
        setTimeout(() => {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
      }
    } catch {
      setMessages((prev) => [...prev, { type: "bot", text: "Oops! Something went wrong. Try again later." }]);
      if (scrollRef.current) {
        setTimeout(() => {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
      }
    } finally {
      setIsBotTyping(false);
    }
  }, [isBotTyping, onUserStart]);

  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest("[data-bot-link]");
      if (link) {
        e.preventDefault();
        addXP(50, "Followed AI Suggestion");

        setTimeout(() => {
          const a = document.createElement("a");
          a.href = link.href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }, 1000);
      }
    };

    const container = scrollRef.current;
    container?.addEventListener("click", handleLinkClick);
    return () => container?.removeEventListener("click", handleLinkClick);
  }, [addXP]);

  // Add showSuggestions state
  const [showSuggestions, setShowSuggestions] = useState(!fromMoodResult);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col max-w-3xl overflow-hidden mx-auto">
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
        {!started && <BotIntro />}

        {showReport && moodReport && started && (
          <div className="w-full flex justify-end px-2">
            <div className="relative max-w-md w-full bg-purple-100 border border-purple-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-purple-200 px-4 py-2 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-purple-800">Today’s Mood Check</p>
                  <p className="text-[10px] text-purple-700">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-purple-900">6/10</p>
                  <p className="text-xs font-semibold text-purple-900">Anxious</p>
                </div>
              </div>
              <div className="p-4 bg-purple-50">
                {userDetails?.dob && userDetails?.gender && (() => {
                  const dob = new Date(userDetails.dob);
                  const age = new Date().getFullYear() - dob.getFullYear();
                  return (
                    <div className="text-[13px] text-purple-700">
                      <p>
                        Age: <span className="font-semibold">{age}</span> |
                        Gender: <span className="font-semibold capitalize">{userDetails.gender}</span>
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {started && messages.map((msg, idx) => (
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

        <div className="h-2" />
        <div ref={endRef} />

        {isBotTyping && (
          <div className="w-full flex justify-start px-2">
            <div className="max-w-md text-sm px-4 py-3 rounded-xl shadow-sm bg-zinc-100 text-slate-700 rounded-bl-none">
              <div className="flex items-center gap-2 mb-1">
                <img src={StarIcon} alt="Bot" className="h-4 w-4" />
                <span className="text-xs text-zinc-500">BrainBot</span>
              </div>
              <p className="animate-pulse">BrainBot is thinking...</p>
            </div>
          </div>
        )}
      </div>
      {/* Footer Section */}
      <div className="bottom relative mt-[332px] sm:mt-[380px] bg-white/50 backdrop-blur-md pt-3 pb-0 px-0 border-t border-zinc-200 z-10 w-full">
        {showSuggestions && (
          <div className="flex justify-center flex-wrap sm:mb-4 mb-6 gap-2">
            {["I feel overwhelmed lately", "Give me some journaling ideas", "Suggest calming exercises"].map((text, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSend(text);
                  setShowSuggestions(false);
                }}
                className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100/70 rounded-full hover:bg-purple-200 transition border border-purple-200">
                {text}
              </button>
            ))}
          </div>
        )}
        <div className="relative">
          <MessageInput onSend={handleSend} disabled={isBotTyping} />
          <div
            className={`absolute bottom-full mb-8 left-0 right-0 flex justify-center transition-opacity duration-500 ${
              showWarning ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="font-semibold text-sm text-red-700 bg-red-50 px-3 py-1 rounded-md shadow">
              Let BrainBot finish replying first!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}