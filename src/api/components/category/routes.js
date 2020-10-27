const express = require('express');

const router = express.Router();

const { newCategoryValidator, categoryIdValidator } = require('../../middleware/validator');

const {
  addCategory, getCategories, getCategory, editCategory, deleteCategory
} = require('./controllers');

router.post('/', newCategoryValidator(), addCategory);
router.get('/', getCategories);
router.get('/:id', categoryIdValidator, getCategory);
router.put('/:id', categoryIdValidator, editCategory);
router.delete('/:id', categoryIdValidator, deleteCategory);
module.exports = router;
