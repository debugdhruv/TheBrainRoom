// src/context/useMood.js
import { useState } from "react";

export function useMood() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const token = localStorage.getItem("token");

  const getTodayMood = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/mood/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch mood");
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getMoodHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/mood/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch history");
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getTodayMood,
    getMoodHistory,
    loading,
    error,
  };
}