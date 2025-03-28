const Product = require("../../models/ProductsModels");

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" });

        await product.deleteOne();
        res.json({ message: "Sản phẩm đã được xóa" });
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi xóa sản phẩm", error: error.message });
    }
};

module.exports = { deleteProduct };
