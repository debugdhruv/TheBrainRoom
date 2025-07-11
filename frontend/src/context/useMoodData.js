import { useEffect, useState } from "react";

const moodToValueMap = {
  Depressed: 1,
  Anxious: 2,
  Stressed: 3,
  Neutral: 4,
  Calm: 5,
};

export const useMoodData = (days = 7) => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodHistory = async () => {
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

        if (!Array.isArray(data)) {
          throw new Error("Invalid mood history response");
        }

        const today = new Date();
        const recentDays = Array.from({ length: days }).map((_, idx) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (days - 1 - idx));
          const dateStr = d.toISOString().split("T")[0];
          const entry = data.find(item => item.date === dateStr);
          return {
            date: dateStr,
            value: entry ? moodToValueMap[entry.moodResult] || 0 : null,
            label: entry ? entry.moodResult : null,
          };
        });

        setMoodHistory(recentDays);
      } catch (err) {
        console.error("Failed to fetch mood history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, [days]);

  return { moodHistory, loading };
};