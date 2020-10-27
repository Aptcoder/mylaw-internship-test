const CategoryService = require('./service');
const Category = require('./model');
const Product = require('../product/model');
const { AppError } = require('../../../services/error');
const { responseHandler } = require('../../../services/response');
const { getQueryData } = require('../../../services/query');
const { getValidationMessages } = require('../../middleware/validator');

module.exports = {
  addCategory: async (req, res, next) => {
    const errorMessages = getValidationMessages(req);
    if (errorMessages) {
      return next(new AppError(400, errorMessages));
    }
    try {
      const categoryServiceInstance = new CategoryService(Category);
      await categoryServiceInstance.createNewCategory(req.body);
      return responseHandler(res, 201, 'Category created');
    } catch (err) {
      return next(err);
    }
  },
  getCategories: async (req, res, next) => {
    const queryData = getQueryData(req.query);
    try {
      const categories = await Category.find(queryData.findQueries)
        .skip(queryData.options.skip)
        .limit(queryData.options.limit)
        .sort({ [queryData.options.sortBy]: queryData.options.orderBy });
      return responseHandler(res, 200, 'Categories', { categories });
    } catch (err) {
      return next(err);
    }
  },
  editCategory: async (req, res, next) => {
    try {
      const categoryServiceInstance = new CategoryService(Category);
      const result = await categoryServiceInstance.editCategory(req.body, req.params.id);
      if (!result.n) {
        throw new AppError(404, 'Category not found');
      }
      return responseHandler(res, 200, 'Category updated');
    } catch (err) {
      return next(err);
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        throw new AppError(404, 'Category not found');
      }
      return responseHandler(res, 200, 'Category', { category });
    } catch (err) {
      return next(err);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      await Category.deleteOne({ _id: req.params.id });
      return responseHandler(res, 200, 'Category deleted');
    } catch (err) {
      return next(err);
    }
  },
  getProductsInCategory: async (req, res, next) => {
    try {
      const products = await Product.find({categories: req.params.id });
      return responseHandler(res, 200, 'Products', { products });
    } catch (err) {
      return next(err);
    }
  }
};
