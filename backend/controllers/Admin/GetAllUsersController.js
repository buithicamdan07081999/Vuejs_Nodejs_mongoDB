const User = require("../../models/Auth/UserModels");

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // không trả mật khẩu
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error: error.message });
  }
};

module.exports = GetAllUsers;