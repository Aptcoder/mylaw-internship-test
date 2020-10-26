const userRouter = require('./components/user/routes');
const productRouter = require('./components/product/routes');

module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
};
