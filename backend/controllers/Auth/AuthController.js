// login, register
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      // 👇 THÊM: kiểm tra email đã tồn tại
      const existedUser = await User.findOne({ email });
      if (existedUser) return res.status(400).json({ message: "Email đã được sử dụng" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        role: role || "user" // 👈 thêm mặc định nếu chưa có role
      });

      await newUser.save();
      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "Email không tồn tại" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: "Sai mật khẩu" });

      // 👇 ẨN MẬT KHẨU trước khi trả về
      const { password: _, ...userWithoutPassword } = user._doc;

      res.status(200).json({ message: "Đăng nhập thành công", user: userWithoutPassword });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = AuthController;
