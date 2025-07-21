const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpService = require("../services/otpService");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, gender, dob } = req.body;
  console.log("📥 Registration Payload:", req.body);



  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender: gender || null,
      dob: dob ? new Date(dob) : null
    });

    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dob: user.dob
      },
      token
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dob: user.dob,
        xp: user.xp,
        xpHistory: user.xpHistory,
      },
      token
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Send OTP endpoint
const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const success = otpService.sendOTP(email);
    if (!success) return res.status(500).json({ message: "Failed to send OTP" });
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ OTP Send Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  sendOTP
};