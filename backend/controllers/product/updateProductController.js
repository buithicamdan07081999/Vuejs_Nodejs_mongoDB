const Product = require("../../models/Products/ProductsModels");

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

        // Chỉ định rõ những trường được phép cập nhật
        const fieldsToUpdate = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            gender: req.body.gender,
            variations: req.body.variations,
        };

        // Nếu có ảnh mới từ frontend gửi lên
        if (req.body.image) {
            fieldsToUpdate.image = req.body.image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            fieldsToUpdate,
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: "Lỗi khi cập nhật sản phẩm", error: error.message });
    }
};

module.exports = { updateProduct };
