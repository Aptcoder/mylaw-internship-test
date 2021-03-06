const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_KEY } = require('../../../config');

// User data access layer

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
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
}, { timestamps: true });

userSchema.pre('save', async function () {
  const user = this;
  if (!this.isNew) {
    return;
  }
  const newPassword = await bcrypt.hash(user.password, 10);
  user.password = newPassword;
  user.permissionLevel = 'user';
});

userSchema.statics.generateToken = function (user) {
  const payload = {
    email: user.email
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_KEY, {
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });
};

userSchema.statics.comparePassword = async function (inputPassword, userPassword) {
  const result = await bcrypt.compare(inputPassword, userPassword);
  return result;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  return _.omit(user, ['password', '__v']);
};

module.exports = mongoose.model('User', userSchema);
