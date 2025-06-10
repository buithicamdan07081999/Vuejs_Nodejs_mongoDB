// Thao tác của User
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

// POST /user/change-password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id)

    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' })

    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng' })

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ message: 'Mật khẩu đã được cập nhật' })
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi đổi mật khẩu', error: err.message })
  }
}

module.exports = changePassword;