import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MoodQuestion({ index, question, value, onNext }) {

  const [sliderValue, setSliderValue] = useState(value || 0);
  
  useEffect(() => {
    setSliderValue(value || 0);
  }, [value, question]);

  const handleSliderChange = (val) => {
    setSliderValue(Math.round(val[0]));
  };

  return (
    <div className="w-full bg-white border border-zinc-200 shadow-sm rounded-xl px-10 py-10">
      <h3 className="text-center text-xl sm:text-2xl font-bold text-slate-800 mb-16">{question}</h3>

      {/* Slider with Value */}
      <div className="relative mb-10">

        <div className="relative w-full max-w-[65%] mx-auto">
          <Slider
            key={question}
            value={[sliderValue]}
            min={0}
            max={10}
            step={1}
            onValueChange={handleSliderChange}
            className="w-full touch-none"/>
        </div>
      </div>

      {/* CTA Button in Center */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => onNext(sliderValue)}
          className="border border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white transition-all">
          {index === 4 ? "Continue" : "Next →"}
        </Button>
      </div>
    </div>
  );
}