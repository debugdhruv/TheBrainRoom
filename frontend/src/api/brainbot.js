export const fetchBrainBotReply = async (message) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/brainbot/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "AI failed to reply");

    return data.reply;
  } catch (err) {
    console.error("🧠 BrainBot Fetch Error:", err.message);
    return "Oops! BrainBot is having a rough day. Try again later.";
  }
};