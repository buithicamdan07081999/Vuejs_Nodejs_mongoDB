const Product = require("../../models/ProductsModels");

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error: error.message });
    }
};

module.exports = { updateProduct };
