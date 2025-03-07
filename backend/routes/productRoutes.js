//Import Thư Viện và Module
const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// GET: API Lấy Danh Sách Sản Phẩm (GET /api/products)
router.get("/", async (req, res) => { // khi kích hoạt phương thức GET
    try {
        const products = await Product.find(); // Tìm Product từ MongoDB.
        res.json(products); // Trả về JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Thêm sản phẩm mới
router.post("/", async (req, res) => {  // khi kích hoạt phương thức POST
    //   1. Tạo newProduct
    const newProduct = new Product({
        // Nhận dữ liệu từ request (req.body) để tạo ra các biến (prod_name, prod_price) 
        // prod_name và prod_price phải trùng với tên cột trong productModel.js
        prod_name: req.body.prod_name,
        prod_price: req.body.prod_price,
    });

    try {
        const savedProduct = await newProduct.save(); // Lưu newProduct vào MongoDB.
        res.status(201).json(savedProduct); // Trả về JSON
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
