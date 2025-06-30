import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BotIdle from "./BotIdle";
import BotChat from "./BotChat";

export default function Chatbot() {
  const location = useLocation();
  const [started, setStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const [moodReport, setMoodReport] = useState(null);
  const [fromMoodResult, setFromMoodResult] = useState(false);

  useEffect(() => {
    if (location.state?.fromMoodResult) {
      const { moodReport } = location.state;
      setMoodReport(moodReport || null);
      setInitialMessage("I'm feeling a little off today..."); // default pehla message (will connect the backend later)
      setFromMoodResult(true);
      setStarted(true);
    }
  }, [location.state]);

  const handleStart = (message) => {
    setInitialMessage(message);
    setStarted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {started ? (
        <BotChat
          initialMessage={initialMessage}
          moodReport={moodReport}
          fromMoodResult={fromMoodResult}
        />
      ) : (
        <BotIdle onSelect={handleStart} />
      )}
    </div>
  );
}