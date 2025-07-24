import { useEffect, useRef, useState, useCallback } from "react";
import { useUser } from "@/context/useUser";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import StarIcon from "@/assets/icons/starsAI.svg";
import { useXP } from "@/context/useXP";
import { fetchBrainBotReply } from "@/api/brainbot";
import { useLocation } from "react-router-dom";

export default function BotChat() {
  const { addXP } = useXP();
  const { userDetails } = useUser();
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  const scrollRef = useRef(null);
  const endRef = useRef(null);
  const [showWarning, setShowWarning] = useState(false);

  const location = useLocation();
  // Get initialMessage, moodReport, fromMoodResult from location.state
  const { moodReport = null, fromMoodResult = false, initialMessage = "" } = location.state || {};
  const showReport = fromMoodResult;

  // Add showSuggestions state (preserved from original)
  // const [showSuggestions, setShowSuggestions] = useState(!fromMoodResult);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hide suggestions if fromMoodResult becomes true


  // Define handleSend before useEffect that uses it
  const handleSend = useCallback(
    async (text, options = { silent: false }) => {
      if (!text?.trim()) return;
      if (isBotTyping) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        return;
      }

      if (!options.silent) {
        setMessages((prev) => [...prev, { type: "user", text }]);
      }

      scrollToBottom();
      setIsBotTyping(true);
      setStarted(true);
      // setShowSuggestions(false);

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
        scrollToBottom();
        setIsBotTyping(false);
        return;
      }

      try {
        const reply = await fetchBrainBotReply(text);
        setMessages((prev) => [...prev, { type: "bot", text: reply }]);
        scrollToBottom();
      } catch {
        setMessages((prev) => [...prev, { type: "bot", text: "Oops! Something went wrong. Try again later." }]);
        scrollToBottom();
      } finally {
        setIsBotTyping(false);
      }
    },
    [isBotTyping]
  );

  // On mount or when initialMessage/moodReport changes: send correct initial message if provided and not already sent and chat not started
  useEffect(() => {
    if (fromMoodResult && moodReport && !hasSentInitialMessage && !started) {
      const moodText = `Hey, here's my mental health report. Please help me evaluate, advise, and suggest.
Score: ${moodReport?.score}/10
Mood: ${moodReport?.mood}
${userDetails?.dob ? "Age: " + (new Date().getFullYear() - new Date(userDetails.dob).getFullYear()) : ""}
${userDetails?.gender ? "Gender: " + userDetails.gender : ""}`.trim();

      const timeout = setTimeout(() => {
        handleSend(moodText, { silent: true });
        setHasSentInitialMessage(true);
      }, 500); // Small delay for natural feel
      return () => clearTimeout(timeout);
    } else if (initialMessage && !hasSentInitialMessage && !started) {
      const timeout = setTimeout(() => {
        handleSend(initialMessage);
        setHasSentInitialMessage(true);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [fromMoodResult, moodReport, initialMessage, hasSentInitialMessage, started, userDetails, handleSend]);

  useEffect(() => {
    const container = scrollRef.current;
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
    container?.addEventListener("click", handleLinkClick);
    return () => container?.removeEventListener("click", handleLinkClick);
  }, [addXP]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto">
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-6 px-4 space-y-4">
        {showReport && moodReport && (
          <div className="w-full flex justify-end px-2">
            <div className="relative max-w-md w-full border border-cyan-100 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-cyan-700 px-4 py-2 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-white">Today’s Mood Check</p>
                  <p className="text-[11px] font-semibold text-white/80">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-white">
                    {moodReport?.score ? `${moodReport.score}/10` : "–"}
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {moodReport?.mood || "–"}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-cyan-50">
                {userDetails?.dob && userDetails?.gender && (() => {
                  const dob = new Date(userDetails.dob);
                  const age = new Date().getFullYear() - dob.getFullYear();
                  return (
                    <div className="text-[13px] text-cyan-700">
                      <p>
                        Age: <span className="font-semibold">{age}</span> | Gender: <span className="font-semibold capitalize">{userDetails.gender}</span>
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
      <div ref={endRef} />
      <div className="h-12" />
      
      {/* Footer Section */}
      <div className="bottom-0 fixed pt-2 pb-4 px-0 z-10 w-auto sm:max-w-3xl sm:w-auto mx-auto">
          <div className="opacity-0 pointer-events-none select-none">
          
        <div className="opacity-0 flex justify-center flex-wrap sm:mb-4 mb-6 gap-2">
          {["I feel overwhelmed lately", "Give me some journaling ideas", "Suggest calming exercises"].map((text, index) => (
            <button
              key={index}
              onClick={() => {
                handleSend(text);
                // setShowSuggestions(false);
              }}
              className="px-4 py-2 text-sm font-medium text-cyan-700 bg-cyan-100/70 rounded-full hover:bg-cyan-200 transition border border-cyan-200">
              {text}
            </button>
          ))}
        </div>
       
          </div>
        
        <div className="relative">
          <MessageInput onSend={handleSend} disabled={isBotTyping} />
          <div
            className={`absolute bottom-full mb-8 left-0 right-0 flex justify-center transition-opacity duration-500 ${
              showWarning ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="font-semibold text-sm text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md shadow">
              Let BrainBot finish replying first!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}