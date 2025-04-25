const Product = require("../../models/Products/ProductsModels");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      gender,
      variations
    } = req.body;

    // 🛠️ Log dữ liệu nhận được từ frontend
    console.log("📦 Dữ liệu nhận từ FE:", req.body);

    // ✅ Kiểm tra các trường bắt buộc
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !image ||
      !Array.isArray(variations) ||
      variations.length === 0
    ) {
      return res.status(400).json({
        message: "Không được để trống các trường bắt buộc hoặc chưa thêm biến thể sản phẩm."
      });
    }

    // ✅ Tạo sản phẩm mới
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
      gender,
      variations
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("❌ Lỗi tạo sản phẩm:", error.message);
    res.status(400).json({
      message: "Lỗi khi tạo sản phẩm",
      error: error.message
    });
  }
};

module.exports = { createProduct };
