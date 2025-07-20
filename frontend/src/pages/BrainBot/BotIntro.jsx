import StarIcon from "@/assets/icons/starsAI.svg";
import { useUser } from "@/context/useUser";

export default function BotIntro() {
  const { userDetails } = useUser();

  return (
    <div className="w-full flex flex-col items-center text-center justify-center space-y-4 pt-16 pb-8">
      <img src={StarIcon} alt="BrainBot Icon" className="w-10 h-10" />
      <h1 className="text-lg font-semibold text-slate-600">
        Hello{userDetails?.firstName ? `, ${userDetails.firstName}` : "there"}
      </h1>
      <p className="text-xl font-bold text-slate-800">Ask BrainBot about anything</p>
      <p className="text-sm text-zinc-500 max-w-sm">
        Talk about your feelings, get suggestions, and explore mental wellness.
      </p>
    </div>
  );
}