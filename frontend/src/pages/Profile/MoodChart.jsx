import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p>{moodLabels[payload[0].value]}</p>
      </div>
    );
  }
  return null;
};

export default function MoodChart() {
  const moodEntries = [
    { date: "2025-06-24", mood: "Neutral" },
    { date: "2025-06-25", mood: "Low" },
    { date: "2025-06-26", mood: "Good" },
    { date: "2025-06-27", mood: "Calm" },
    { date: "2025-06-28", mood: "Anxious" },
    { date: "2025-06-29", mood: "Good" },
    { date: "2025-06-30", mood: "Neutral" },
    { date: "2025-07-01", mood: "Calm" },
  ];

  const today = new Date();
  const last7 = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const day = dayNames[d.getDay()];

    const moodEntry = [...moodEntries]
      .reverse()
      .find((entry) => entry.date === dateStr);

    last7.push({
      day,
      mood: moodEntry ? moodScoreMap[moodEntry.mood] : null,
    });
  }

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm w-full">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={last7} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9333EA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9333EA" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#666" }}
            axisLine={false}
            tickLine={false}
          />
          {/* ⛔ Removed Y-Axis completely */}

          <CartesianGrid vertical={false} stroke="#E4E4E7" strokeDasharray="" />

          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#9333EA", strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="mood"
            stroke="#9333EA"
            strokeWidth={2}
            fill="url(#moodGradient)"
            activeDot={{ r: 5, fill: "#9333EA", stroke: "white", strokeWidth: 2 }}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}