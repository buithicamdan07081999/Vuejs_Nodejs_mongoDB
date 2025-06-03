// getAll, getById, update, delete
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

// ✅ Tạo user mới - Admin tạo
const CreateUser = async (req, res) => {
  try {
    const { email, password, role, avatar } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: role || "user",
      avatar: avatar || "",
    });

    res.status(201).json({ message: "Tạo tài khoản thành công", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi tạo tài khoản", error: err.message });
  }
};

module.exports = CreateUser;