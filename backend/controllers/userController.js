// controllers/userController.js
import User from "../models/User.js";

export const fetchProfile = async (req, res) => {
  try {
    // req.user will be set by your auth middleware after verifying JWT
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      profile: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/userController.js
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
