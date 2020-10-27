const express = require('express');

const router = express.Router();

const { registerAdmin, loginAdmin } = require('./controllers');
const { userRegValidator, userLoginValidator } = require('../../middleware/validator');
// const { adminAuthorization, authentication } = require('../../middleware/auth');

router.post('/register', userRegValidator(), registerAdmin);
router.post('/login', userLoginValidator(), loginAdmin);

module.exports = router;
