const mongoose = require('mongoose');
const { DB_URL } = require('.');
const logger = require('./logger');
const { seedCategories, seedProducts } = require('../services/seed');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    logger.info('mongoose connection successful');
    seedCategories();
    seedProducts();
  })
  .catch((err) => {
    logger.error(err);
  });
