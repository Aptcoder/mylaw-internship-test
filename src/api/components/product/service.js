const _ = require('lodash');
const logger = require('../../../config/logger');

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async createNewProduct(data) {
    try {
      const product = await this.productModel.create(data);
      return product;
    } catch (err) {
      logger.error(err);
      throw new Error('Could not create product');
    }
  }

  async editProduct(newData, id) {
    try {
      const updates = _.pick(newData, ['name', 'details', 'price']);
      if (newData.categories) {
        updates.$addToSet = { categories: { $each: newData.categories } };
      }
      const result = await this.productModel.updateOne({ _id: id }, updates);
      return result;
    } catch (err) {
      logger.error(err);
      throw new Error('Could not edit product');
    }
  }
}

module.exports = { ProductService };
