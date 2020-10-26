const express = require('express');

const router = express.Router();

const { newCategoryValidator } = require('../../middleware/validator');

const { addNewCategory } = require('./controllers');

router.post('/', newCategoryValidator(), addNewCategory);

module.exports = router;
