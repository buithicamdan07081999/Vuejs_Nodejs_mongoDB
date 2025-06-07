const bcrypt = require("bcryptjs");
const User = require("../../models/Auth/UserModels");

const AddUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã được sử dụng.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await newUser.save();

    res.status(201).json({ message: 'Tạo tài khoản thành công!' });
  } catch (error) {
    console.error('Lỗi tạo tài khoản:', error);
    res.status(500).json({ message: 'Lỗi server.' });
  }
};

module.exports = AddUser;