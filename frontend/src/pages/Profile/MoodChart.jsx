import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
      <div className="bg-white text-black text-sm px-6 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p>{moodLabels[payload[0].value]}</p>
      </div>
    );
  }
  return null;
};

export default function MoodChart({ range }) {
  const chartData = useMemo(() => {
    const today = new Date();
    const rangeMap = { "7d": 7, "30d": 30 };
    const daysToShow = rangeMap[range] ?? 7;

    const data = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const label =
        range === "7d"
          ? dayNames[d.getDay()]
          : String(daysToShow - i);

      const moodScore = Math.floor(Math.random() * 5) + 1;

      data.push({ day: label, mood: moodScore });
    }
    return data;
  }, [range]);

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm w-full">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
            interval="preserveStartEnd"
          />

          <CartesianGrid vertical={false} stroke="#E4E4E7" />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#9333EA", strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="mood"
            stroke="#9333EA"
            strokeWidth={2}
            fill="url(#moodGradient)"
            activeDot={{ r: 6, fill: "#9333EA", stroke: "white", strokeWidth: 2 }}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};