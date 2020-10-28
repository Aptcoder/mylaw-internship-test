const express = require('express');

const router = express.Router();

const { newCategoryValidator, categoryIdValidator } = require('../../middleware/validators');

const {
  addCategory, getCategories, getCategory, editCategory, deleteCategory, getProductsInCategory
} = require('./controllers');

const { adminAuthorization, authentication } = require('../../middleware/auth');

router.post('/', authentication, adminAuthorization, newCategoryValidator(), addCategory);
router.get('/', authentication, getCategories);
router.get('/:id/products', authentication, categoryIdValidator, getProductsInCategory);
router.get('/:id', authentication, categoryIdValidator, getCategory);
router.put('/:id', authentication, adminAuthorization, categoryIdValidator, editCategory);
router.delete('/:id', authentication, adminAuthorization, categoryIdValidator, deleteCategory);
module.exports = router;
