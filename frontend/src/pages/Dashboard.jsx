// import dayjs from "dayjs";
import { useXP } from "@/context/useXP";
import { useEffect } from "react";
import { useUser } from "@/context/useUser";
import { useState } from "react";
import sampleCards from "@/assets/contentCards";

export default function Dashboard() {
  const { addXP } = useXP(); // Get XP function
  const { userDetails } = useUser();
  const firstName = userDetails?.firstName || "there";

  const [quote, setQuote] = useState();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/quote`);
        const data = await res.json();
        if (res.ok && data.quote) {
          setQuote(data.quote);
        } else {
          throw new Error("Invalid quote format");
        }
      } catch (err) {
        console.error("❌ Quote fetch error, using fallback:", err);
        setQuote("You are not your thoughts.");
      }
    };

    fetchQuote(); // fetch once initially
    const intervalId = setInterval(fetchQuote, 2 * 60 * 1000); // every 2 mins

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  useEffect(() => {
    const today = new Date();
    const isMonday = today.getDay() === 4;
    const lastBonusDate = localStorage.getItem("weekly_bonus_date");

    if (isMonday && lastBonusDate !== today.toDateString()) {
      addXP(20, "Weekly bonus");
      localStorage.setItem("weekly_bonus_date", today.toDateString());
    }
  }, [addXP]);



  const handleCardClick = (link) => {
    addXP(50, "Followed AI Suggestion");
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1000);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl text-slate-600 font-semibold mb-2">Welcome {firstName}! 👋</h1>
      <p className="text-slate-400 mb-8">{quote}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-100 via-cyan-300 to-cyan-500 rounded-xl animate-gradient" />
          <div
            onClick={() => handleCardClick(sampleCards[0].link)}
            className="relative cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <div className="w-full aspect-video bg-zinc-200 flex items-center justify-center overflow-hidden">
              <img
                src={sampleCards[0].thumbnail}
                alt={sampleCards[0].title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-800">{sampleCards[0].title}</h3>
              <p className="text-sm text-zinc-500">{sampleCards[0].source}</p>
            </div>
          </div>
        </div>

        {sampleCards.slice(1).map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(card.link, card.title)}
            className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border"
          >
            <div className="w-full aspect-video bg-zinc-200 flex items-center justify-center overflow-hidden">
              <img
                src={card.thumbnail}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-800">{card.title}</h3>
              <p className="text-sm text-zinc-500">{card.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}