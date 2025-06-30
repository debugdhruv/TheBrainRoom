export default function BotReportCard({ mood, score }) {
  
  return (
    <div className="w-full bg-purple-50 border border-purple-100 text-slate-700 px-6 py-4 rounded-xl shadow-sm mb-4">
      <div className="flex items-center justify-between gap-4">
        {/* Mood Summary */}
        <div>
          <p className="text-sm text-zinc-500">Mood Score</p>
          <h2 className="text-2xl font-bold text-purple-700">{score} / 10</h2>
          <p className="text-sm text-zinc-500 mt-1">
            We’ve analyzed your mood and emotions. Let’s take it from here 🤝
          </p>
        </div>

        {/* Mood Tag */}
        <div className="px-4 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full whitespace-nowrap">
          {mood}
        </div>
      </div>
    </div>
  );
}