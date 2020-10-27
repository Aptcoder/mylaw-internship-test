const userRouter = require('./components/user/routes');
const productRouter = require('./components/product/routes');
const adminRouter = require('./components/admin/routes');
const categoryRouter = require('./components/category/routes');

module.exports = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/admin/', adminRouter);
};
