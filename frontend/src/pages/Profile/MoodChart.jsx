import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [range, setRange] = useState("7d");

  const today = new Date();
  const rangeMap = { "7d": 7, "30d": 30, "90d": 90 };
  const daysToShow = rangeMap[range] || 7;

  const chartData = [];
  for (let i = daysToShow - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const label =
      range === "7d"
        ? dayNames[d.getDay()]
        : String(daysToShow - i); // Just number 1 to 30

    const moodScore = Math.floor(Math.random() * 5) + 1;

    chartData.push({ day: label, mood: moodScore });
  }

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold text-zinc-700">Mood Chart</div>
        <Tabs value={range} onValueChange={setRange}>
          <TabsList>
            <TabsTrigger value="7d">7D</TabsTrigger>
            <TabsTrigger value="30d">30D</TabsTrigger>
            {/* <TabsTrigger value="90d">3M</TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>
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