// controllers/Auth/AuthController.js
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, role });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully", user: newUser });
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

      res.status(200).json({ message: "Đăng nhập thành công", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = AuthController;
