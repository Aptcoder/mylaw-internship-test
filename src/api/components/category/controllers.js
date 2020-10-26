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
      return await categoryServiceInstance.createNewCategory(req.body);
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
  }
};
