const Order = require('../../models/Order/OrderModel')

const CreateOrder = async (req, res) => {
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

module.exports = CreateOrder;