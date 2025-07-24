require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const moodRoutes = require("./routes/moodRoutes");
const brainBotRoutes = require("./routes/brainBotRoutes");
const pwdRoutes = require("./routes/pwdRoutes");

connectDB();

const app = express();
const PORT = process.env.PORT || 5050;

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  "https://tbr-apibkend-x86.onrender.com"
];

app.use((req, res, next) => {
  const origin = req.get("origin");
  if (!origin || allowedOrigins.includes(origin)) {
    next();
  } else {
    console.log("❌ Blocked by origin middleware:", origin);
    res.status(403).send("Access Denied");
  }
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", quoteRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/brainbot", brainBotRoutes);
app.use("/api/get-protected-link", pwdRoutes);

app.get("/", (req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});