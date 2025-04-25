const express = require("express");
const { updateProduct } = require("../controllers/product/updateProductController");
const { getAllProducts, getProductById, getLatestProducts, gettoppriceProducts } = require("../controllers/product/getProductController");
const { createProduct } = require("../controllers/product/createProductController"); 

const router = express.Router();

// Thêm mới sản phẩm
router.post("/", createProduct); // 🛠 FIXED - thêm sản phẩm mới

// Load - Hiển thị sản phẩm
router.get("/", getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/price", gettoppriceProducts);
router.get("/:id", getProductById);

// Cập nhật sản phẩm
router.put("/:id", updateProduct);

module.exports = router;
