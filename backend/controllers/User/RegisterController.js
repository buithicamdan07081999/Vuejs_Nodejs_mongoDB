// Thao tác của User
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password, phone, address, avatar } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tên, email và mật khẩu là bắt buộc" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email đã tồn tại" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone, address, avatar });

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const { password: _, ...userSafe } = user._doc;
    res.status(201).json({ message: "Đăng ký thành công", user: userSafe, token });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi đăng ký", error: err.message });
  }
};

module.exports = {
  Register,
};