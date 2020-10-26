const express = require('express');

const router = express.Router();

const { registerUser, loginUser } = require('./controllers');
const { userRegValidator, userLoginValidator } = require('../../middleware/validator');
const { adminAuthorization, authentication } = require('../../middleware/auth');

router.get('/', (req, res) => {
  res.send('yay!');
});

router.post('/', userRegValidator(), registerUser);
router.post('/login', userLoginValidator(), loginUser);
router.put('/:id/make-admin', authentication, adminAuthorization, (req, res) => {
  res.send({
    message: 'Hello'
  });
});

// admin routes 

module.exports = router;
