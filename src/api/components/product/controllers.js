const Product = require('./model');
const { ProductService } = require('./service');
const { AppError } = require('../../../services/error');
const { getQueryData } = require('../../../services/query');
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
  },
  getProducts: async (req, res, next) => {
    const queryData = getQueryData(req.query);
    try {
      const products = await Product.find(queryData.findQueries)
        .skip(queryData.options.skip)
        .limit(queryData.options.limit)
        .sort({ [queryData.options.sortBy]: queryData.options.orderBy })
        .populate('categories');
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
      const result = await productServiceInstance.editProduct(req.body, req.params.id);
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
      const product = await Product.findById(req.params.id).populate('categories');
      if (!product) {
        throw new AppError(404, 'Category not found');
      }
      return res.send({
        status: 'success',
        message: 'Product',
        data: {
          product
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
