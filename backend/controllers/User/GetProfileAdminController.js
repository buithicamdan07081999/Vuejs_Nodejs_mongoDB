// Thao tác của User
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const GetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy profile", error: err.message });
  }
};
module.exports = GetProfile;