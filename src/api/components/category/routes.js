const express = require('express');

const router = express.Router();

const { newCategoryValidator, categoryIdValidator } = require('../../middleware/validator');

const {
  addCategory, getCategories, getCategory, editCategory, deleteCategory
} = require('./controllers');

const { adminAuthorization, authentication } = require('../../middleware/auth');

router.post('/', authentication, adminAuthorization, newCategoryValidator(), addCategory);
router.get('/', authentication, getCategories);
router.get('/:id', authentication, categoryIdValidator, getCategory);
router.put('/:id', authentication, adminAuthorization, categoryIdValidator, editCategory);
router.delete('/:id', authentication, adminAuthorization, categoryIdValidator, deleteCategory);
module.exports = router;
