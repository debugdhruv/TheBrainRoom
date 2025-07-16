const axios = require("axios");

const sendToBrainBot = async (message) => {
  const routerURL = "https://openrouter.ai/api/v1/chat/completions";

  const headers = {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://thebrainroom.vercel.app/", // or your frontend URL
    "X-Title": "The Brain Room"
  };

  const body = {
    model: "deepseek/deepseek-chat-v3-0324",
    messages: [
      {
        role: "system",
        content: "You are BrainBot, a friendly and caring mental health AI guide who offers warm, practical, and thoughtful suggestions."
      },
      {
        role: "user",
        content: message
      }
    ],
    temperature: 0.7
  };

  const response = await axios.post(routerURL, body, { headers });
  return response.data.choices[0].message.content;
};

// ✅ This is the important part:
module.exports = { sendToBrainBot };