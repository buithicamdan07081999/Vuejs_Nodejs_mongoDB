const express = require('express')
const router = express.Router()
const OrderController = require('../../controllers/Order/OrderController')

// POST - Tạo đơn hàng
router.post('/', OrderController.createOrder)

// GET - Admin xem tất cả đơn hàng
router.get('/', OrderController.getAllOrders)

// GET - User xem đơn hàng của chính mình
router.get('/user/:userId', OrderController.getOrdersByUser)

module.exports = router