const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Đăng ký user
const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      
      console.log("📩 Dữ liệu nhận được:", req.body);
  
      // Kiểm tra email đã tồn tại chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã tồn tại!" });
      }
  
      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      console.log("🔑 Mật khẩu sau khi hash:", hashedPassword);
  
      // Lưu user vào DB
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
      console.error("🔥 Lỗi server:", error);
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