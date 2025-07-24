const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password === process.env.PROTECTED_PASSWORD) {
    return res.json({ url: "https://github.com/debugdhruv/thebrainroom.git" });
  } else {
    return res.status(403).json({ message: "Forbidden: Incorrect password" });
  }
});

module.exports = router;