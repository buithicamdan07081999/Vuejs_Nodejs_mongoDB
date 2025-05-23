const Category = require('../../models/Products/CategoryModel');

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục để cập nhật' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: error.message });
  }
};

module.exports = { updateCategory };
