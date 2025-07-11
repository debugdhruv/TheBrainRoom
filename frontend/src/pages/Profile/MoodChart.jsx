import { useMemo, useState, useEffect } from "react";
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

const moodToValue = {
  Depressed: 1,
  Anxious: 2,
  Stressed: 3,
  Neutral: 4,
  Calm: 5,
};

// Tooltip Component
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
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        const res = await fetch(`${baseUrl}/api/mood/history`, {
          headers: {
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }), // ✅ good code
},
        });
        const data = await res.json();
        if (Array.isArray(data)) setMoodData(data);
      } catch (err) {
        console.error("❌ Failed to fetch mood history:", err);
      }
    };
    fetchData();
  }, []);

  const chartData = useMemo(() => {
    const today = new Date();
    const data = [];

    if (range === "7d") {
      const endDate = new Date(today);
      const startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - endDate.getDay()); // Start from current week's Sunday

      for (let i = 0; i < 7; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dateKey = d.toISOString().split("T")[0];
        const found = moodData.find((entry) => entry.date === dateKey);
        const moodValue = found ? moodToValue[found.moodResult] || null : null;
        const label = d.toLocaleDateString("en-US", { weekday: "short" });
        data.push({ day: label, mood: moodValue });
      }
    } else {
      const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      for (let i = 0; i < 30; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        const dateKey = d.toISOString().split("T")[0];
        const found = moodData.find((entry) => entry.date === dateKey);
        const moodValue = found ? moodToValue[found.moodResult] || null : null;
        const label = `${d.getDate()}`;
        data.push({ day: label, mood: moodValue });
      }
    }

    return data;
  }, [range, moodData]);

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm w-full">
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
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
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#9333EA", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="mood"
            stroke="#9333EA"
            strokeWidth={2}
            fill="url(#moodGradient)"
            activeDot={{ r: 6, fill: "#9333EA", stroke: "white", strokeWidth: 2 }}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}