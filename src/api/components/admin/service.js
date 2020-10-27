const logger = require('../../../config/logger');
const UserService = require('../user/service');

class AdminService extends UserService {
  async registerAdmin(userData) {
    try {
      const { user, token } = await super.registerUser(userData);
      user.permissionLevel = 'admin';
      user.save();
      return { user, token };
    } catch (err) {
      logger.error(err);
      throw new Error('Could not register admin');
    }
  }
}

module.exports = AdminService;
