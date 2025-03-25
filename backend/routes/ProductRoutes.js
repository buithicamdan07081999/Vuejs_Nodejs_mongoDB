
const express = require("express");
const Product = require("../models/ProductsModels");

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 🟢 POST - Create new product (có kiểm tra đầu vào)
router.post("/", async (req, res) => {
    try {
        const { name, price, description, category, image, stock } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Tên và giá sản phẩm là bắt buộc" });
        }

        const product = new Product({ name, price, description, category, image, stock });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi tạo sản phẩm", error: error.message });
    }
});


// 🟢 PUT - Update product (dùng findByIdAndUpdate tối ưu hơn)
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error: error.message });
    }
});

// 🟢 DELETE - Xóa sản phẩm (kiểm tra trước khi xóa)
router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });
        }

        await product.deleteOne();
        res.json({ message: "Sản phẩm đã được xóa" });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
    }
});

module.exports = router;
