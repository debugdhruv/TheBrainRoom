export default function Dashboard() {

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
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl text-slate-600 font-semibold mb-2">Hello Dhruv! 👋</h1>
      <p className="text-slate-400 mb-8">{quote}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleCards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border">

            <div className="w-full aspect-video bg-zinc-200 flex items-center justify-center overflow-hidden">
              <img
                src={card.thumbnail}
                alt={card.title}
                className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-800">{card.title}</h3>
              <p className="text-sm text-zinc-500">{card.source}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}