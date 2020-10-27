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
      const product = await ProductServiceInstance.createNewProduct(req.body);
      console.log('product', product);
      return res.status(201).send({
        status: 'success',
        message: 'Product created successfully'
      });
    } catch (err) {
      return next(err);
    }
  },
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find({});
      return res.send({
        status: 'success',
        message: 'Products',
        data: {
          products
        }
      });
    } catch (err) {
      return next(err);
    }
  },
  editProduct: async (req, res, next) => {
    try {
      const productServiceInstance = new ProductService(Product);
      const result = await productServiceInstance.editCategory(req.body, req.params.id);
      if (!result.n) {
        throw new AppError(404, 'Product not found');
      }
      return res.send({
        status: 'success',
        message: 'Product updated'
      });
    } catch (err) {
      return next(err);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const category = await Product.findById(req.params.id);
      if (!category) {
        throw new AppError(404, 'Category not found');
      }
      return res.send({
        status: 'success',
        message: 'Product',
        data: {
          category
        }
      });
    } catch (err) {
      return next(err);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        status: 'success',
        message: 'Product deleted'
      });
    } catch (err) {
      return next(err);
    }
  }
};
