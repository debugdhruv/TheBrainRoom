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
  const handleNext = (value) => {
    const updated = [...responses];
    updated[currentIndex] = value;
    setResponses(updated);

    if (currentIndex === moodQuestions.length - 1) {
      setShowLoader(true);
      setTimeout(() => {
        navigate("/dashboard/mood/result", { state: { responses: updated } });
      }, 2500);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
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
            className="flex items-center gap-1 bg-purple-200 text-purple-600 font-bold text-sm border border-zinc-100 px-4 py-2 rounded-md hover:bg-purple-100 disabled:opacity-30">
            <img src={BackIcon} alt="Back" className="h-4 w-4" />Back
          </button>
        </div>

        {/* Title and Subtitle */}
        <div className="w-full max-w-[580px] text-left space-y-1">
          <h1 className="text-2xl font-bold text-slate-800">
            Let’s understand how you feel
          </h1>
          <p className="text-sm text-zinc-500">
            Answer 5 quick questions to get your mood report
          </p>
        </div>

        {/* Progress bar */}
        {/* Custom Progress Bar */}
        <div className="w-full max-w-3xl">
          <div className="flex gap-[6px]">
            {moodQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`h-[6px] rounded-full transition-all duration-300 ease-in-out ${idx === currentIndex
                  ? "bg-slate-800 w-full"
                  : "bg-neutral-300 w-[150px] opacity-60"
                  }`} />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full max-w-3xl">
          <MoodQuestion
            index={currentIndex}
            question={moodQuestions[currentIndex].question}
            value={responses[currentIndex]}
            onNext={handleNext} />
        </div>
      </div>
    </div>
  );
}