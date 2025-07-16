const express = require("express");
const router = express.Router();
const { handleBrainBotMessage } = require("../controllers/brainBotController");

router.post("/message", handleBrainBotMessage);

module.exports = router;