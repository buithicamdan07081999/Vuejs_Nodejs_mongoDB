const Category = require('../../models/Products/CategoryModel');

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm danh mục
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xoá danh mục
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xoá danh mục.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
