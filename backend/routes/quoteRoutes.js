const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/quote", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random", { timeout: 5000 });
    const data = response.data;

    if (Array.isArray(data) && data[0] && data[0].q && data[0].a) {
      res.json({ quote: data[0].q, author: data[0].a });
    } else {
      throw new Error("Unexpected quote format");
    }
  } catch (error) {
    console.error("Quote fetch error in backend:", error.message);
    res.status(500).json({ message: "Failed to fetch quote from external API" });
  }
});

module.exports = router;