const Order = require('../../models/Order/OrderModel')

const GetAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username').sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách đơn hàng', error })
  }
}

module.exports = GetAllOrder;