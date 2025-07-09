const mongoose = require("mongoose");

const moodLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
  },
  scores: {
    q1: { type: Number, required: true },
    q2: { type: Number, required: true },
    q3: { type: Number, required: true },
    q4: { type: Number, required: true },
    q5: { type: Number, required: true },
  },
  moodResult: {
    type: String,
    required: true,
  },
  moodScore: {
    type: Number,
    required: true,
  },
  notesToAI: {
    type: String, // For future use with BrainBot
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

moodLogSchema.index({ user: 1, date: 1 }, { unique: true }); // Ensure one log per day per user

module.exports = mongoose.model("MoodLog", moodLogSchema);