const Product = require('./model');
const { ProductService } = require('./service');
const { AppError } = require('../../../services/error');
const { getValidationMessages } = require('../../middleware/validator');

module.exports = {
  addNewProduct: async (req, res, next) => {
    const errorMessages = getValidationMessages(req);
    if (errorMessages) {
      return next(new AppError(400, errorMessages));
    }
    try {
      const ProductServiceInstance = new ProductService(Product);
      await ProductServiceInstance.createNewProduct(req.body);
      return res.status(201).send({
        status: 'success',
        message: 'Product created successfully'
      });
    } catch (err) {
      return next(err);
    }
  }
};
