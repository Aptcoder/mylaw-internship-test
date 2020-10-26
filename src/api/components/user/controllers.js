const { AppError } = require('../../../services/error');
const UserService = require('./service');
const User = require('./model');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const userServiceInstance = new UserService(User);
      const data = await userServiceInstance.registerUser(req.body);
      res.set('x-auth', data.token);
      return res.status(201).send({
        message: 'user created',
        status: 'success'
      });
    } catch (err) {
      return next(err);
    }
  }
};
