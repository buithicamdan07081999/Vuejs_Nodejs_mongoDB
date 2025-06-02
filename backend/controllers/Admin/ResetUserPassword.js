const User = require('../../models/Auth/UserModels')
const bcrypt = require('bcrypt')

const ResetUserPassword = async (req, res) => {
  const { id } = req.params
  const { newPassword } = req.body

  try {
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' })

    const hashed = await bcrypt.hash(newPassword, 10)
    user.password = hashed
    await user.save()

    res.json({ message: 'Cập nhật mật khẩu thành công' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}

module.exports = ResetUserPassword