const CategoryService = require('./service');
const Category = require('./model');
const { AppError } = require('../../../services/error');
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
      return res.status(201).send({
        status: 'success',
        message: 'Category created'
      });
    } catch (err) {
      return next(err);
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.find({});
      return res.send({
        status: 'success',
        message: 'Categories',
        data: {
          categories
        }
      });
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
      return res.send({
        status: 'success',
        message: 'Category updated'
      });
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
      return res.send({
        status: 'success',
        message: 'Category',
        data: {
          category
        }
      });
    } catch (err) {
      return next(err);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      await Category.deleteOne({ _id: req.params.id });
      return res.status(200).send({
        status: 'success',
        message: 'Category deleted'
      });
    } catch (err) {
      return next(err);
    }
  }
};
