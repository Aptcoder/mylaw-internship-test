const logger = require("../../../config/logger");

export default class UserService {

    constructor(userModel){
        this.userModel = userModel;
    }

    async registerUser(userData){
        try {
            let user = await this.userModel.create(userData);
            let token = await this.userModel.generateToken(user);
            return {user, token};
        }catch (err){
            logger.error(err);
            throw new Error('Could not add user data')
        }
    } 
}