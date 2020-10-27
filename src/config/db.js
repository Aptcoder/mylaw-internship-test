const mongoose = require('mongoose');
const { DB_URL } = require('.');
const logger = require('./logger');
const { seedCategories } = require('../services/seed');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    logger.info('mongoose connection successful');
    seedCategories();
  })
  .catch((err) => {
    logger.error(err);
  });
