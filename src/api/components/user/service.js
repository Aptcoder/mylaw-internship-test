const logger = require("../../../config/logger");

export default class UserService {

    constructor(userModel){
        this.userModel = userModel;
    }

    async addUser(userData){
        try {
            let newUser = new this.userModel(userData)
        }catch (err){
            logger.error(err);
            throw new Error('Could not add user data')
        }
    } 
}