const express = require("express");
const router = express.Router();
const {
  saveMood,
  getTodayMood,
  getMoodHistory,
  deleteMood,
} = require("../controllers/moodController");
const protect = require("../middleware/authMiddleware");

// Save or update today's mood entry
router.post("/", protect, saveMood);

// Get today's mood entry
router.get("/today", protect, getTodayMood);

// Get full mood history
router.get("/history", protect, getMoodHistory);

// Optional: delete a specific mood entry by ID
router.delete("/:id", protect, deleteMood);

module.exports = router;