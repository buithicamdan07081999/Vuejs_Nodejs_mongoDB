import Product from "../models/Product.js";

// Lấy tất cả sản phẩm
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sizes.sizeId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 6 sản phẩm mới nhất
export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 }) // sắp xếp mới nhất
      .limit(6)
      .populate("sizes.sizeId");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getLatestProducts };