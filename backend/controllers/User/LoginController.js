// Thao tác của User
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email không tồn tại" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Sai mật khẩu" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const { password: _, ...userSafe } = user._doc;
    res.json({ message: "Đăng nhập thành công", user: userSafe, token });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi đăng nhập", error: err.message });
  }
};

module.exports = Login;