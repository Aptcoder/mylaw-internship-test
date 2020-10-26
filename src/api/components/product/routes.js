const express = require('express');

const router = express.Router();

const { newProductValidator } = require('../../middleware/validator');

router.post('/', newProductValidator);

module.exports = router;
