// getAll, getById, update, delete
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

// ✅ Lấy danh sách user
const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Ẩn mật khẩu
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
  }
};

module.exports = {
  GetAllUsers,
};