const express = require('express');
const { getAllCategories, getCategoryById } = require("../../controllers/Category/getCategoryController");
const { createCategory } = require('../../controllers/Category/createCategoryController');
const { updateCategory } = require('../../controllers/Category/updateCategoryController');
const { deleteCategory } = require('../../controllers/Category/deleteCategoryController');

const router = express.Router();

router.get("/", getAllCategories); // GET /api/categories
router.get("/:id", getCategoryById); // GET /api/categories/:id
router.put("/:id", updateCategory); // PUT /api/categories/:id
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;