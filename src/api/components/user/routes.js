const express = require('express');

const router = express.Router();

const {registerUser } = require('./controllers');

router.get('/', (req, res) => {
  res.send('yay!');
});

router.post('/', registerUser);
module.exports = router;
