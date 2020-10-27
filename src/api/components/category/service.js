const _ = require('lodash');
const logger = require('../../../config/logger');

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async createNewCategory(data) {
    try {
      const category = await this.categoryModel.create(data);
      return category;
    } catch (err) {
      logger.error(err);
      throw new Error('Could not create category');
    }
  }

  async editCategory(newData, id) {
    try {
      const updates = _.pick(newData, ['name', 'details']);
      const result = await this.categoryModel.updateOne({ _id: id }, updates);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Could not edit category');
    }
  }
}

module.exports = CategoryService;
