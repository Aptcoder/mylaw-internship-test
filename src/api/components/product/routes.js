const express = require('express');

const router = express.Router();

const { newProductValidator } = require('../../middleware/validator');

const { addNewProduct, getProducts, getProduct, editProduct, deleteProduct } = require('./controllers');

const { adminAuthorization, authentication } = require('../../middleware/auth');


router.post('/', authentication, adminAuthorization, newProductValidator(), addNewProduct);
router.get('/', authentication, getProducts);
router.get('/:id', authentication, getProduct);
router.put('/:id', authentication, adminAuthorization, editProduct);
router.delete('/:id', authentication, adminAuthorization, deleteProduct);


module.exports = router;
