const mongoose = require('mongoose');
const { DB_URL } = require('.');
const logger = require('./logger');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    logger.info('mongoose connection successful');
  })
  .catch((err) => {
    logger.error(err);
  });
