// Thêm sửa xóa dữ liệu từ MongoDB
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    prod_name: { type: String, required: true },
    prod_price: { type: Number, required: true }
},  { versionKey: false });

// Tạo collection với tên "products" 
const Product = mongoose.model("Product", productSchema); 
module.exports = Product; // Xuất model khi dùng gọi const Product = require("../models/productModel");
