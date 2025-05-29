const Order = require('../../models/Order/OrderModel')

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

// Lấy tất cả đơn hàng (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username').sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách đơn hàng', error })
  }
}

// Lấy đơn hàng theo user (user tự xem đơn mình)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product')
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng của bạn' })
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders
}