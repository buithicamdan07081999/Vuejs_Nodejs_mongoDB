const Order = require('../../models/Order/OrderModel')

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice } = req.body

    const newOrder = new Order({ userId, items, totalPrice })
    const savedOrder = await newOrder.save()

    res.status(201).json(savedOrder)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo đơn hàng', error })
  }
}

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username').sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách đơn hàng', error })
  }
}

// Lấy đơn hàng theo user (user tự xem đơn mình)
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy đơn hàng theo user', error })
  }
}