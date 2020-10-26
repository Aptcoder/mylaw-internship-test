const logger = require("../../../config/logger");

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
}

module.exports = { ProductService };
