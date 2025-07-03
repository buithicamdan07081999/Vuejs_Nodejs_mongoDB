const express = require('express');
const router = express.Router();
const { addToCart } = require("../../controllers/Cart/CartController");
const auth = require("../../middlewares/authMiddleware");
router.post("/add", auth, addToCart);

module.exports = router;
