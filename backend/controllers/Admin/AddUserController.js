// getAll, getById, update, delete
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

const AddUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    // Validate đơn giản
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã được sử dụng.' });
    }

    const newUser = new User({
      name,
      email,
      password, // nên hash bằng bcrypt ở đây
      phone,
      address,
      role: role || 'user',
    });

    await newUser.save();

    res.status(201).json({ message: 'Tạo người dùng thành công.' });
  } catch (error) {
    console.error('Lỗi tạo người dùng:', error);
    res.status(500).json({ message: 'Lỗi server.' });
  }
};

module.exports = AddUser;