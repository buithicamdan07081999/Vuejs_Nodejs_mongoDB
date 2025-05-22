const Category = require('../../models/Products/CategoryModel');

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy danh mục' });

    res.json({ message: 'Đã xoá danh mục' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

module.exports = { deleteCategory };