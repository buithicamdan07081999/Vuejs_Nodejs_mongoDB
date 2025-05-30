const express = require('express');
const router = express.Router();

const CreateOrder = require('../../controllers/Order/CreateOrderController');
const GetAllOrder = require('../../controllers/Order/GetAllOrderController');
const GetMyOrder = require('../../controllers/Order/GetMyOrderController');

const protect = require('../../middlewares/authMiddleware');

router.post('/', protect, CreateOrder);
router.get('/', protect, GetAllOrder);
router.get('/listorder', protect, GetMyOrder);

module.exports = router;
