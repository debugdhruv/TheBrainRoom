const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword, updateXP } = require("../controllers/profileController");
const protect = require("../middleware/authMiddleware");

router.get("/me", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.put("/xp", protect, updateXP);

module.exports = router;