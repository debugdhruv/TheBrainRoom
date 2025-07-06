const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: false
  },
  dob: {
    type: Date,
    required: false
  },
  xp: {
    type: Number,
    default: 0,
  },
  xpHistory: [
    {
      points: { type: Number, required: true },
      action: { type: String, required: true },
      date: { type: String, required: true },
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);