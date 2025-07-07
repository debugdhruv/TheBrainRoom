// import dayjs from "dayjs";
import thumbImage from "@/assets/thumbo.png";
import { useXP } from "@/context/useXP";
import { useEffect } from "react";
import { useUser } from "@/context/useUser";
import { useState } from "react";

export default function Dashboard() {
  const { addXP } = useXP(); // Get XP function
  const { userDetails } = useUser();
  const firstName = userDetails?.firstName || "there";

  const [quote, setQuote] = useState("You are not your thoughts.");

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


  const sampleCards = [
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "Enroll with our Patreon and earn upto 50$ every week 👀",
      source: "YouTube",
      thumbnail: thumbImage,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
  ];

  const handleCardClick = (link) => {
    // Step 1: reward XP first
    addXP(50, "Followed AI Suggestion");

    // Step 2: delay the tab opening so toast can show first
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1000); // delay by 1000ms = 1 second
  };
  return (
    <div className="w-full">
      <h1 className="text-2xl text-slate-600 font-semibold mb-2">Hello {firstName}! 👋</h1>
      <p className="text-slate-400 mb-8">{quote}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleCards.map((card, index) => (
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