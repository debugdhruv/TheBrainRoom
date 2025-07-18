import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BotChat from "./BotChat";

export default function Chatbot() {
  const location = useLocation();
  const [initialMessage, setInitialMessage] = useState(null);
  const [moodReport, setMoodReport] = useState(null);
  const [fromMoodResult, setFromMoodResult] = useState(false);

  useEffect(() => {
    if (location.state?.fromMoodResult) {
      const { moodReport } = location.state;
      setMoodReport(moodReport || null);
      setInitialMessage("I'm feeling a little off today...");
      setFromMoodResult(true);
    }
  }, [location.state]);

  const handleStart = (message) => {
    setInitialMessage(message);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <BotChat
        initialMessage={initialMessage}
        moodReport={moodReport}
        fromMoodResult={fromMoodResult}
        onUserStart={handleStart}
      />
    </div>
  );
}