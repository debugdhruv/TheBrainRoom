// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { sendOtp, verifyOtp } = require("../services/otpService");

router.post("/otp/verify", verifyOtp);
router.post("/otp/send", sendOtp);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;