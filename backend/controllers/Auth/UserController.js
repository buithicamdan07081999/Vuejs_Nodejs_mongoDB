// getAll, getById, update, delete
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

// ✅ Lấy danh sách user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Ẩn mật khẩu
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng" });
  }
};

// ✅ Lấy 1 user theo ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
  }
};

// ✅ Tạo user mới
const createUser = async (req, res) => {
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

// ✅ Cập nhật user
const updateUser = async (req, res) => {
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

// ✅ Xóa user
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy người dùng" });
    res.json({ message: "Xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xóa người dùng" });
  }
};

const getProfile = (req, res) => {
  res.json(req.user);
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};