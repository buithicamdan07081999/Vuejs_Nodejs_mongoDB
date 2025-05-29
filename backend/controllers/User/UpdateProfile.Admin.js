// Thao tác của User
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UpdateProfile = async (req, res) => {
  try {
    const { name, phone, address, avatar, password } = req.body;
    const data = { name, phone, address, avatar };
    if (password) data.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user._id, data, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({ message: "Cập nhật thành công", user });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật profile", error: err.message });
  }
};

module.exports = {
  UpdateProfile,
};