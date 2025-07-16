const { sendToBrainBot } = require("../services/brainBotService");

const handleBrainBotMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const reply = await sendToBrainBot(message);
    res.json({ reply });
  } catch (error) {
    console.error("🧠 BrainBot Error:", error.message);
    res.status(500).json({ error: "BrainBot failed to respond." });
  }
};

module.exports = { handleBrainBotMessage };