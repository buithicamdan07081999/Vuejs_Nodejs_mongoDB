const express = require('express');
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getMyOrders
} = require('../../controllers/Order/OrderController');

const { protect } = require('../../middlewares/authMiddleware');

// POST - Tạo đơn hàng (phải đăng nhập)
router.post('/', protect, createOrder);

// GET - Admin xem tất cả đơn hàng (giả sử cần đăng nhập và là admin)
router.get('/', protect, getAllOrders);

// GET - User xem đơn hàng của chính mình
router.get('/my-orders', protect, getMyOrders);

module.exports = router;
