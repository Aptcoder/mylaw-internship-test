const { getValidationMessages } = require('../../middleware/validator');
const { AppError } = require('../../../services/error');
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
      return res.status(201).send({
        message: 'admin created',
        status: 'success'
      });
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
      return res.status(200).send({
        message: 'Login sucessful',
        status: 'success'
      });
    } catch (err) {
      return next(err);
    }
  }
};
