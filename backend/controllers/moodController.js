const MoodLog = require("../models/MoodLog");

// @desc   Save or update today's mood
// @route  POST /api/mood
// @access Private
const saveMood = async (req, res) => {
  const userId = req.user._id;
  const today = new Date().toISOString().split("T")[0];

  const { q1, q2, q3, q4, q5, moodResult, moodScore, notesToAI } = req.body;

  if (
    [q1, q2, q3, q4, q5, moodResult, moodScore].some((v) => v === undefined)
  ) {
    return res.status(400).json({ message: "Missing mood data" });
  }

  try {
    const existingLog = await MoodLog.findOne({ user: userId, date: today });

    if (existingLog) {
      // Update today's mood (retake logic)
      existingLog.scores = { q1, q2, q3, q4, q5 };
      existingLog.moodResult = moodResult;
      existingLog.moodScore = moodScore;
      existingLog.notesToAI = notesToAI || "";
      await existingLog.save();
      return res.status(200).json({ message: "Mood updated", data: existingLog });
    }

    const newLog = await MoodLog.create({
      user: userId,
      date: today,
      scores: { q1, q2, q3, q4, q5 },
      moodResult,
      moodScore,
      notesToAI,
    });

    return res.status(201).json({ message: "Mood saved", data: newLog });
  } catch (err) {
    console.error("❌ Error saving mood:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get today's mood
// @route  GET /api/mood/today
// @access Private
const getTodayMood = async (req, res) => {
  const userId = req.user._id;
  const today = new Date().toISOString().split("T")[0];

  try {
    const todayLog = await MoodLog.findOne({ user: userId, date: today });

    if (!todayLog) {
      return res.status(404).json({ message: "No mood entry for today" });
    }

    return res.status(200).json(todayLog);
  } catch (err) {
    console.error("❌ Error fetching today's mood:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get full mood history
// @route  GET /api/mood/history
// @access Private
const getMoodHistory = async (req, res) => {
  const userId = req.user._id;

  try {
    const history = await MoodLog.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error("❌ Error fetching mood history:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// (Optional) @desc Delete a specific mood entry
// @route  DELETE /api/mood/:id
// @access Private
const deleteMood = async (req, res) => {
  const userId = req.user._id;
  const moodId = req.params.id;

  try {
    const mood = await MoodLog.findOne({ _id: moodId, user: userId });

    if (!mood) {
      return res.status(404).json({ message: "Mood entry not found" });
    }

    await mood.deleteOne();
    res.status(200).json({ message: "Mood entry deleted" });
  } catch (err) {
    console.error("❌ Error deleting mood entry:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  saveMood,
  getTodayMood,
  getMoodHistory,
  deleteMood, // optional
};