const { getValidationMessages } = require('../../middleware/validator');
const { AppError } = require('../../../services/error');
const UserService = require('./service');
const User = require('./model');
const { responseHandler } = require('../../../services/response');

module.exports = {
  registerUser: async (req, res, next) => {
    const errorMessages = getValidationMessages(req);
    if (errorMessages) {
      return next(new AppError(400, errorMessages));
    }
    try {
      const userServiceInstance = new UserService(User);
      const user = await userServiceInstance.getUser({ email: req.body.email });
      if (user) {
        throw new AppError(400, 'Email already registered. Login');
      }
      const data = await userServiceInstance.registerUser(req.body);
      res.set('x-auth', data.token);
      return responseHandler(res, 201, 'user created');
    } catch (err) {
      return next(err);
    }
  },
  loginUser: async (req, res, next) => {
    const errorMessages = getValidationMessages(req);
    if (errorMessages) {
      return next(new AppError(400, errorMessages));
    }
    try {
      const userServiceInstance = new UserService(User);
      const user = await userServiceInstance.getUser({ email: req.body.email });
      if (!user) {
        throw new AppError(404, 'No user with email address');
      }
      const result = await userServiceInstance.authenticateUser(user, req.body);
      if (!result.isAuth) {
        throw new AppError(401, 'Incorrect password');
      }
      res.set('x-auth', result.token);
      return responseHandler(res, 200, 'Login sucessful');
    } catch (err) {
      return next(err);
    }
  }

};
