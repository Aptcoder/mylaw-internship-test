const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../../../config');
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
}, {timestamps});

userSchema.pre('save', function async (){
    const user = this;
    if(!this.isNew){
        return;
    }
    const newPassword = await bcrypt.hash(user.password, 10);
    user.password = newPassword;
    await user.save();
});

userSchema.statics.generateToken = function(user){
    const User = this;
    const payload = {
        email: user.email
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_KEY  , {
            expiresIn: '1d',
        }, (err, token) => {
            if(err){
                return reject(err);
            };
            resolve(token)
        });
    })

}

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    return _.omit(user, ['password', '__v']);
  };

module.exports = mongoose.model('User', userSchema);


