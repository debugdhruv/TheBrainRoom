import { useXP } from "@/context/useXP"; // Add this import at top
import { useEffect } from "react";

export default function Dashboard() {
  const { addXP } = useXP(); // Get XP function

  useEffect(() => {
    const today = new Date();
    const isMonday = today.getDay() === 4;
    const lastBonusDate = localStorage.getItem("weekly_bonus_date");

    if (isMonday && lastBonusDate !== today.toDateString()) {
      addXP(20, "Weekly bonus");
      localStorage.setItem("weekly_bonus_date", today.toDateString());
    }
  }, [addXP]);

  const randomQuotes = [
    "You are not your thoughts.",
    "Feelings are visitors, let them come and go.",
    "Healing is not linear.",
    "You're doing your best — and that's enough.",
  ];

  const quote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

  const sampleCards = [
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      title: "Tips to reduce anxiety",
      source: "Article",
      thumbnail: "https://source.unsplash.com/400x200/?calm",
      link: "https://www.healthline.com/health/how-to-reduce-anxiety",
    },
    {
      title: "How to stop overthinking",
      source: "YouTube",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
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
      <h1 className="text-2xl text-slate-600 font-semibold mb-2">Hello Dhruv! 👋</h1>
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