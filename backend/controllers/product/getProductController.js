const Product = require("../../models/Products/ProductsModels");

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy sản phẩm theo lastest
const getLatestProducts = async (req, res) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 }).limit(6);
      res.json(products);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm mới nhất:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  // Lấy sản phẩm theo price
  const gettoppriceProducts = async (req, res) => {
    try {
      const products = await Product.find().sort({ price: -1 }).limit(6);
      res.json(products);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm theo giá:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { getAllProducts, getProductById, getLatestProducts, gettoppriceProducts};