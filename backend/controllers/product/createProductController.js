const Product = require("../../models/Products/ProductsModels");

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock, sizes } = req.body;
        if (!name || !price || !description || !category || !image || !sizes) {
            return res.status(400).json({ message: "Không được để trống" });
        }
        const product = new Product({ name, price, description, category, image, sizes });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi tạo sản phẩm", error: error.message });
    }
};

module.exports = { createProduct };
