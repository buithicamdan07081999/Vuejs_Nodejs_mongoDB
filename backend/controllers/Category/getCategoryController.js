const Category = require('../../models/Products/CategoryModel');

// Lấy toàn bộ danh mục
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách danh mục', error: error.message });
  }
};

// Lấy danh mục theo ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById
};
