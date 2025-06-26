import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MoodQuestion({ index, question, value, onNext }) {
  const [sliderValue, setSliderValue] = useState(value || 5);

  useEffect(() => {
    setSliderValue(value || 5);
  }, [value]);

  const handleSliderChange = (val) => {
    setSliderValue(val[0]);
  };

  return (
    <div className="mt-4 w-full bg-white border border-zinc-200 shadow-sm rounded-xl px-6 py-8">
      {/* Question */}
      <h3 className="text-xl font-semibold text-slate-700 mb-2">Q{index + 1}</h3>
      <p className="text-sm text-slate-500 mb-6">{question}</p>

      {/* Slider + Value */}
      <div className="relative mb-8">
        <div className="flex justify-between text-sm mb-2 px-1 text-zinc-400">
          <span>0</span>
          <span>10</span>
        </div>

        <div className="relative w-full">
          <Slider
            defaultValue={[sliderValue]}
            min={0}
            max={10}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-purple-700"
            style={{ left: `${(sliderValue / 10) * 100}%`, transition: "left 0.2s" }}
          >
            {sliderValue}
          </div>
        </div>
      </div>

      {/* Only One CTA Button */}
      <div className="flex justify-end">
        <Button onClick={() => onNext(sliderValue)}>
          {index === 4 ? "Continue" : "Next →"}
        </Button>
      </div>
    </div>
  );
}