const Product = require('./model');
const { ProductService } = require('./service');

module.exports = {
  addNewProduct: async (req, res, next) => {
    try {
      const ProductServiceInstance = new ProductService(Product);
      const product = await ProductServiceInstance.addNewProduct(req.body);
      return res.status(201).send({
        status: 'success',
        message: 'Product created successfully'
      });
    } catch (err) {
      return next(err);
    }
  }
};
