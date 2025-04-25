const Product = require('../../models/Products/ProductsModels');

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xoá.' });
    }
    res.status(200).json({ message: 'Xoá thành công', deleted });
  } catch (err) {
    console.error('Lỗi xoá sản phẩm:', err.message);
    res.status(500).json({ message: 'Lỗi server khi xoá sản phẩm', error: err.message });
  }
};

module.exports = { deleteProduct };
