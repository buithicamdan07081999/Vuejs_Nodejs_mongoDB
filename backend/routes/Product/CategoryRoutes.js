const express = require('express');
const { getAllCategories, getCategoryById } = require("../../controllers/Category/getCategoryController");
const { createCategory } = require('../../controllers/Category/createCategoryController');
const { updateCategory } = require('../../controllers/Category/updateCategoryController');
const { deleteCategory } = require('../../controllers/Category/deleteCategoryController');

const router = express.Router();

router.get("/", getAllCategories); 
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;