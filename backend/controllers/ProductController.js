import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sizes.sizeId"); // JOIN với bảng Size
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};