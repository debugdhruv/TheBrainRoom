const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
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
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);