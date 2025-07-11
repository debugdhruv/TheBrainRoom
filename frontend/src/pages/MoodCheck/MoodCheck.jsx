import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodQuestion from "./MoodQuestion";
import MoodLoader from "./MoodLoader";
import { moodQuestions } from "./moodData";
import BackIcon from "@/assets/icons/back.svg";

export default function MoodCheck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(Array(moodQuestions.length).fill(0));
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const handleNext = async (value) => {
    const updated = [...responses];
    updated[currentIndex] = value;
    setResponses(updated);

    if (currentIndex === moodQuestions.length - 1) {
      setShowLoader(true);

      const weightedScore = calculateWeightedScore(updated);
      const moodResult = getMood(weightedScore);

      try {
        const token = localStorage.getItem("token");
        await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/mood`, {
          method: "POST",
          headers: {
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }), // ✅ good code
},
          body: JSON.stringify({
            q1: updated[0],
            q2: updated[1],
            q3: updated[2],
            q4: updated[3],
            q5: updated[4],
            moodResult: moodResult.label,
            moodScore: weightedScore,
          }),
        });
      } catch (err) {
        console.error("❌ Failed to save mood:", err);
      }

      setTimeout(() => {
        navigate("/dashboard/mood/result", { state: { responses: updated } });
      }, 2500);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const calculateWeightedScore = (responses) => {
    let total = 0;
    let totalWeight = 0;
    for (let i = 0; i < responses.length; i++) {
      const { polarity, weight } = moodQuestions[i];
      const score = responses[i];
      const normalized = polarity === "negative" ? 10 - score : score;
      total += normalized * weight;
      totalWeight += weight;
    }
    return Number((total / totalWeight).toFixed(1));
  };

  const moodMap = [
    { label: "Depressed" },
    { label: "Anxious" },
    { label: "Stressed" },
    { label: "Neutral" },
    { label: "Calm" },
  ];

  const getMood = (score) => {
    if (score < 3) return moodMap[0];
    if (score < 5) return moodMap[1];
    if (score < 6.5) return moodMap[2];
    if (score < 8) return moodMap[3];
    return moodMap[4];
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (showLoader) return <MoodLoader />;

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4 pb-20">
      <div className="w-full max-w-3xl space-y-8">
        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 bg-purple-200 text-purple-600 font-bold text-sm border border-zinc-100 px-4 py-2 rounded-md hover:bg-purple-100 disabled:opacity-30"
          >
            <img src={BackIcon} alt="Back" className="h-4 w-4" /> Back
          </button>
        </div>

        {/* Title */}
        <div className="text-left space-y-1">
          <h1 className="text-2xl font-bold text-slate-800">Let’s understand how you feel</h1>
          <p className="text-sm text-zinc-500">Answer 5 quick questions to get your mood report</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-[6px]">
          {moodQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-[6px] rounded-full transition-all duration-300 ease-in-out ${
                idx === currentIndex ? "bg-slate-800 w-full" : "bg-neutral-300 w-[150px] opacity-60"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <MoodQuestion
          index={currentIndex}
          question={moodQuestions[currentIndex].question}
          value={responses[currentIndex]}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}