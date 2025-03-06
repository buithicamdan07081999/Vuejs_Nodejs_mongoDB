const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  const newProduct = new Product({
    prod_name: req.body.prod_name,
    prod_price: req.body.prod_price,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
