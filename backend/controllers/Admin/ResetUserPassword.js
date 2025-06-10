const User = require('../../models/Auth/UserModels')
const bcrypt = require('bcryptjs')

const changeUserPassword = async (req, res) => {
  try {
    const userId = req.params.id
    const { newPassword } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' })

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu mới không hợp lệ (ít nhất 6 ký tự)' })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ message: 'Đã cập nhật mật khẩu cho người dùng' })
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi đổi mật khẩu người dùng', error: err.message })
  }
}

module.exports = changeUserPassword