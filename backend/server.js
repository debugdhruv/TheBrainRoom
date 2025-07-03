import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("🧠 Brain Room backend is up and running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});