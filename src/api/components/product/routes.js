const express = require('express');

const router = express.Router();

const { newProductValidator } = require('../../middleware/validator');

const { addNewProduct } = require('./controllers');

router.post('/', newProductValidator(), addNewProduct);

module.exports = router;
