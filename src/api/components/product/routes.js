const express = require('express');

const router = express.Router();

const { newProductValidator, categoryIdValidator } = require('../../middleware/validator');

const { addNewProduct, getProducts, getProduct, editProduct, deleteProduct } = require('./controllers');

const { adminAuthorization, authentication } = require('../../middleware/auth');


router.post('/', authentication, adminAuthorization, newProductValidator(), addNewProduct);
router.get('/', authentication, getProducts);
router.get('/:id', authentication, categoryIdValidator, getProduct);
router.put('/:id', authentication, adminAuthorization, categoryIdValidator, editProduct);
router.delete('/:id', authentication, adminAuthorization, categoryIdValidator, deleteProduct);


module.exports = router;
