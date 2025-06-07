const User = require("../../models/Auth/UserModels");

const UpdateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, address, role, isAdmin, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address, role, isAdmin, avatar },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật người dùng", error: error.message });
  }
};
module.exports = UpdateProfile;