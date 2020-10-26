const logger = require('../../../config/logger');

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async registerUser(userData) {
    try {
      const user = await this.userModel.create(userData);
      const token = await this.userModel.generateToken(user);
      return { user, token };
    } catch (err) {
      logger.error(err);
      throw new Error('Could not add user data');
    }
  }

  async getUser(data) {
    try {
      const user = await this.userModel.findOne(data);
      return user;
    } catch (err) {
      logger.error(err);
      throw new Error('Could not find user');
    }
  }

  async authenticateUser(user, data) {
    try {
      const result = await this.userModel.comparePassword(data.password, user.password);
      if (!result) {
        return { isAuth: result };
      }
      const token = await this.userModel.generateToken(user);
      return { isAuth: result, token };
    } catch (err) {
      logger.error(err);
      throw new Error('Could not authenticate user');
    }
  }
}

module.exports = UserService;
