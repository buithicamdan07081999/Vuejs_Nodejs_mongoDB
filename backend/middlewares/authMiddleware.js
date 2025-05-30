const jwt = require('jsonwebtoken')
const User = require('../models/Auth/UserModels')

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Chưa đăng nhập' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token không hợp lệ' })
  }
}

module.exports = protect;