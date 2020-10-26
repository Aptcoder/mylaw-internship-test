const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../utils/error');
const User = require('../components/user/model');
const { JWT_KEY } = require('../../config');
const logger = require('../../config/logger');

module.exports = {
  authentication: async (req, res, next) => {
    const token = req.header('x-auth');
    if (!token) {
      return res.status(401).send({
        status: 'error',
        message: 'Not allowed.'
      });
    }
    try {
      const decoded = await jwt.verify(token, JWT_KEY);
      if (!decoded) {
        throw new ErrorHandler(500, 'Something unexpected went wrong');
      }
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        throw new ErrorHandler(401, 'Not allowed.');
      }
      req.user = user;
      return next();
    } catch (err) {
      logger.error(err);
      return next(err);
    }
  },

  adminAuthorization: async (req, res, next) => {
    if (!req.user && !req.user.permissionLevel === 'admin') {
      return res.status(403).send({
        status: 'error',
        message: 'Not allowed. '
      });
    }
    return next();
  }
};
