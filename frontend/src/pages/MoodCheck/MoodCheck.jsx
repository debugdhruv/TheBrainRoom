import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoodQuestion from "./MoodQuestion";
import MoodLoader from "./MoodLoader";
import { moodQuestions } from "./moodData";

export default function MoodCheck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(Array(moodQuestions.length).fill(5));
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
    <div className="w-full flex flex-col items-center px-4 pb-20">
      <div className="w-full max-w-xl mt-10 space-y-6">
        {/* Top navigation and question count */}
        <div className="flex justify-between items-center text-sm text-zinc-400 font-medium">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="text-purple-600 hover:underline disabled:opacity-40"
          >
            ← Back
          </button>
          <span>
            {currentIndex + 1} of {moodQuestions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 h-2">
          {moodQuestions.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-full transition-all duration-300 ease-in-out ${idx === currentIndex
                  ? "bg-purple-600 h-2"
                  : "bg-purple-300 h-[6px] opacity-60"
                }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <MoodQuestion
          index={currentIndex}
          question={moodQuestions[currentIndex].question}
          value={responses[currentIndex]}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}