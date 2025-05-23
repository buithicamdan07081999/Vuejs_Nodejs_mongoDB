const Category = require('../../models/Products/CategoryModel');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Tên không được bỏ trống" });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Tên đã tồn tại" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

module.exports = { createCategory };
