const Order = require('../../models/Order/OrderModel')

const GetMyOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product')
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng của bạn' })
  }
}

module.exports = GetMyOrder;