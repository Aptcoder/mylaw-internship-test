const { body,checkSchema, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Category = require('../components/category/model');

exports.userRegValidator = () => ([
  body('email').isString().isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').isString()
]);

exports.userLoginValidator = () => ([
  body('email').isString().isEmail(),
  body('password').isLength({ min: 6 })
]);

exports.newProductValidator = () => ([
  body('name').isString(),
  body('price').isNumeric(),
  body('category').custom((category) => {
    if (!mongoose.isValidObjectId(category)) {
      return Promise.reject('Invalid value for category field');
    }
  })
]);
exports.categoryIdValidator = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send({
      status: 'error',
      message: 'Invalid id value'
    });
  }
  return next();
};

exports.newCategoryValidator = () => ([
  body('name').isString(),
]);

exports.getValidationMessages = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => `${error.param} - ${error.msg}`);
    return errorMessages;
  }
  return undefined;
};
