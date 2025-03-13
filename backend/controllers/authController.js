const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Đăng ký user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email đã tồn tại!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Đăng ký thành công!", user });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// Đăng nhập user
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("📩 Dữ liệu nhận được:", req.body);
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại!" });
      }
  
      console.log("🔐 Mật khẩu nhập:", password);
      console.log("🗄 Mật khẩu trong DB:", user.password);
  
      // So sánh mật khẩu nhập vào với mật khẩu trong database
      const isMatch = await bcrypt.compare(password, user.password); // 🔥 Sửa lỗi ở đây
      console.log("✅ Kết quả so sánh:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Sai mật khẩu!" });
      }
  
      res.json({ message: "Đăng nhập thành công!" });
    } catch (error) {
      console.error("🔥 Lỗi server:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  };

// Lấy thông tin user
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User không tồn tại!" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
// registerUser: Kiểm tra email tồn tại chưa, mã hóa password, lưu vào DB.
// loginUser: Kiểm tra email & password, tạo token JWT.
// getUserProfile: Lấy thông tin user (trừ password).