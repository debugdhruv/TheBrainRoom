const crypto = require("crypto");
const nodemailer = require("nodemailer");

const otpStore = new Map(); // key: email, value: { otp, expiresAt }

// ⚙️ Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

// 🔐 Generate 6-digit OTP
const generateOtp = () => {
  return crypto.randomInt(1000, 9999).toString();
};

// 📤 Send OTP via Email
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(email, { otp, expiresAt });

    const mailOptions = {
      from: process.env.OTP_EMAIL_USER,
      to: email,
      subject: "Your BrainRoom OTP Verification Code",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ OTP sent to", email);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// ✅ New: Express-compatible Verify OTP endpoint
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const record = otpStore.get(email);
    if (!record) return res.status(400).json({ message: "No OTP found for this email" });

    const { otp: storedOtp, expiresAt } = record;
    if (Date.now() > expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otp !== storedOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(email); // Invalidate after use
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("❌ Error verifying OTP:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};