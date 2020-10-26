const mongoose = require('mongoose');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true, 
        minlength: 6,
        trim: true
    },
    permissionLevel: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    return _.omit(user, ['password', '__v']);
  };

module.exports = mongoose.model('User', userSchema);


