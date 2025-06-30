import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mapping moods to numeric levels
const moodScoreMap = {
  Low: 1,
  Anxious: 2,
  Neutral: 3,
  Good: 4,
  Calm: 5,
};

const moodLabels = {
  1: "Low",
  2: "Anxious",
  3: "Neutral",
  4: "Good",
  5: "Calm",
};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MoodChart() {
  // 🧠 Simulated mood entries (normally fetched from localStorage or DB)
  const moodEntries = [
    { date: "2025-06-24", mood: "Neutral" },
    { date: "2025-06-25", mood: "Low" },
    { date: "2025-06-26", mood: "Good" },
    { date: "2025-06-27", mood: "Calm" },
    { date: "2025-06-28", mood: "Anxious" },
    { date: "2025-06-29", mood: "Good" },
    { date: "2025-06-30", mood: "Neutral" },
    { date: "2025-07-01", mood: "Calm" }, // today
  ];

  const today = new Date();
  const last7 = [];

  // Prepare data for the past 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const day = dayNames[d.getDay()];

    // Find matching mood for that day (latest one if multiple)
    const moodEntry = [...moodEntries]
      .reverse()
      .find((entry) => entry.date === dateStr);

    last7.push({
      day,
      mood: moodEntry ? moodScoreMap[moodEntry.mood] : null,
    });
  }

  return (
    <div className="bg-white rounded-xl border p-4 shadow-md w-full max-w-3xl">
      <h2 className="text-lg font-semibold text-zinc-700 mb-2">Mood Trend (Past 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={last7}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => moodLabels[value]}
          />
          <Tooltip
            formatter={(value) => moodLabels[value]}
            labelStyle={{ color: "#9333EA", fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#9333EA"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#9333EA", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}