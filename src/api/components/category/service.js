const logger = require("../../../config/logger");

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
}

module.exports = CategoryService;
