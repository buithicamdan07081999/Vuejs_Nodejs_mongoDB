const Category = require('../../models/Products/CategoryModel');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ message: 'Danh mục đã tồn tại' });

    const category = new Category({ name });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

module.exports = { createCategory };