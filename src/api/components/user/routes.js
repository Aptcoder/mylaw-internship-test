const express = require('express');

const router = express.Router();

const { registerUser, loginUser } = require('./controllers');
const { userRegValidator, userLoginValidator } = require('../../middleware/validator');

router.get('/', (req, res) => {
  res.send('yay!');
});

router.post('/', userRegValidator(), registerUser);
router.post('/login', userLoginValidator(), loginUser);
module.exports = router;
