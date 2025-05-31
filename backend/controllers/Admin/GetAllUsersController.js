const User = require("../../models/Auth/UserModels");

// GET /api/admin/userslist → Trả danh sách tất cả user trong DB
const GetProfile = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // không trả mật khẩu
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error: error.message });
  }
};

module.exports = GetProfile;