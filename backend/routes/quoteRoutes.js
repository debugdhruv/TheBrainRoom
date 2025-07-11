const express = require("express");
const axios = require("axios");
const router = express.Router();

let lastQuote = null;
let lastQuoteTimestamp = 0;

const fallbackQuotes = [
  { quote: "Take a breath. You're okay.", author: "Brain Room" },
  { quote: "Not every storm comes to disrupt. Some clear the path.", author: "Brain Room" },
  { quote: "You’ve survived 100% of your worst days.", author: "Brain Room" },
  { quote: "Rest is productive too.", author: "Brain Room" },
  { quote: "Healing isn’t linear, but it’s worth it.", author: "Brain Room" },
  { quote: "Be kind to your mind.", author: "Brain Room" },
  { quote: "This too shall pass.", author: "Brain Room" },
  { quote: "Breathe. Reflect. Reset.", author: "Brain Room" },
  { quote: "Joy is not canceled.", author: "Brain Room" },
  { quote: "You’re more than your bad days.", author: "Brain Room" }
];

router.get("/quote", async (req, res) => {
  const now = Date.now();
  const twoMinutes = 2 * 60 * 1000;

  if (lastQuote && now - lastQuoteTimestamp < twoMinutes) {
    return res.json(lastQuote);
  }

  try {
    const response = await axios.get("https://zenquotes.io/api/random", { timeout: 10000 });
    const data = response.data;

    if (Array.isArray(data) && data[0] && data[0].q && data[0].a) {
      lastQuote = { quote: data[0].q, author: data[0].a };
      lastQuoteTimestamp = now;
      res.json(lastQuote);
    } else {
      throw new Error("Unexpected quote format");
    }
  } catch (error) {
    console.error("Quote fetch error in backend:", error.message);
    const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.status(200).json(randomFallback);
  }
});

module.exports = router;