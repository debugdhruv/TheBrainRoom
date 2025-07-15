const User = require("../models/User");
const bcrypt = require("bcryptjs");

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    const salt = await bcrypt.genSalt(10);
    const hashedNew = await bcrypt.hash(newPassword, salt);

    user.password = hashedNew;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("❌ Password Change Error:", err);
    res.status(500).json({ message: "Failed to update password" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

const updateProfile = async (req, res) => {
  const { firstName, lastName, gender, dob, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (gender) user.gender = gender;
    if (dob) user.dob = new Date(dob);

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateXP = async (req, res) => {
  const { amount, reason, oncePerDay } = req.body;
  if (amount === undefined || !reason) {
    return res.status(400).json({ message: "Amount and reason are required" });
  }

  const today = new Date().toISOString().split("T")[0];

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (oncePerDay) {
      const alreadyExists = user.xpHistory.some(
        (entry) => entry.date === today && entry.action === reason
      );

      if (alreadyExists) {
        return res.status(200).json({ success: false, message: "XP already awarded today" });
      }
    }

    await User.updateOne(
      { _id: req.user._id },
      {
        $inc: { xp: amount },
        $push: {
          xpHistory: {
            $each: [{ points: amount, action: reason, date: today }],
            $position: 0,
          },
        },
      }
    );

    const updatedUser = await User.findById(req.user._id).select("xp xpHistory");

    res.status(200).json({ success: true, xp: updatedUser.xp, xpHistory: updatedUser.xpHistory });
  } catch (err) {
    console.error("❌ XP Update Error:", err);
    res.status(500).json({ message: "Failed to update XP" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateXP,
  changePassword
};