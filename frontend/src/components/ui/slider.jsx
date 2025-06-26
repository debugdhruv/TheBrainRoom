import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full justify-center items-center h-12", // smaller + centered
      className
    )}
    {...props}
  >
    {/* Track */}
    <SliderPrimitive.Track className="relative h-[8px] w-full rounded-full bg-purple-100">
      <SliderPrimitive.Range className="absolute h-full rounded-full bg-purple-600" />
    </SliderPrimitive.Track>

    {/* Thumb */}
    <SliderPrimitive.Thumb
      className={cn(
        "relative flex items-center justify-center h-[32px] w-[32px] rounded-full border border-purple-100 bg-white/20 backdrop-blur-sm shadow-md transition-all duration-150",
        "hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:pointer-events-none"
      )}
    >
      <span className="absolute -top-6 text-xs font-bold text-purple-700 bg-white bg-opacity-70 backdrop-blur-sm px-1.5 py-0.5 rounded">
      {Number.isFinite(props.value?.[0]) ? Math.round(props.value[0]) : ""}
      </span>
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };