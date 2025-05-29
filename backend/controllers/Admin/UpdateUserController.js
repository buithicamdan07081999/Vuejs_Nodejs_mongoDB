// getAll, getById, update, delete
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

// ✅ Cập nhật user
const UpdateUser = async (req, res) => {
  try {
    const { email, password, role, avatar } = req.body;

    const updatedData = {
      email,
      role,
      avatar,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedUser) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật tài khoản", error: err.message });
  }
};

module.exports = {
  UpdateUser,
};