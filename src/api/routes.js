const userRouter = require('./components/user/routes');

module.exports = (app) => {
    app.use('/api/users', userRouter);
}