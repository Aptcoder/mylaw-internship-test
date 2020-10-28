const { getValidationMessages } = require('../../middleware/validators');
const { AppError } = require('../../../services/error');
const { responseHandler } = require('../../../services/response');
const AdminService = require('./service');
const User = require('../user/model');

module.exports = {
  registerAdmin: async (req, res, next) => {
    const errorMessages = getValidationMessages(req);
    if (errorMessages) {
      return next(new AppError(400, errorMessages));
    }
    try {
      const adminServiceInstance = new AdminService(User);
      const user = await adminServiceInstance.getUser({ email: req.body.email });
      if (user) {
        throw new AppError(400, 'Email already registered. Login');
      }
      const data = await adminServiceInstance.registerAdmin(req.body);
      res.set('x-auth', data.token);
      return responseHandler(res, 201, 'admin created');
    } catch (err) {
      return next(err);
    }
  },
  loginAdmin: async (req, res, next) => {
    const errorMessages = getValidationMessages(req);
    if (errorMessages) {
      return next(new AppError(400, errorMessages));
    }
    try {
      const adminServiceInstance = new AdminService(User);
      const user = await adminServiceInstance.getUser({ email: req.body.email, permissionLevel: 'admin' });
      if (!user) {
        throw new AppError(404, 'No user with email address');
      }
      const result = await adminServiceInstance.authenticateUser(user, req.body);
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
