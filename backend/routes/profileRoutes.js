const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, changePassword, updateXP, unlockPremium } = require("../controllers/profileController");
const protect = require("../middleware/authMiddleware");

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.put("/xp", protect, updateXP);
router.post("/unlock-premium", protect, unlockPremium);

module.exports = router;