const express = require('express');
const { createCategory } = require('../controllers/Category/createCategoryController');
const { getAllCategories } = require('../controllers/Category/getCategoryController');
const { updateCategory } = require('../controllers/Category/updateCategoryController');
const { deleteCategory } = require('../controllers/Category/deleteCategoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;