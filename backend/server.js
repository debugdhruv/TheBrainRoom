// server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL, // this needs to be defined in your .env
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin); // debug log
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true,
}));

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🧠 Brain Room backend is up and running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
