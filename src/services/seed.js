const Category = require('../api/components/category/model');
const logger = require('../config/logger');

exports.seedCategories = async () => {
  try {
    const count = await Category.count({});
    if (count < 3) {
      await Category.insertMany([
        { name: 'bags', details: 'Leather and all type of hand bags' },
        { name: 'caps' },
        { name: 'hats' },
        { name: 'wrist watches' },
        { name: 'food stuff' },
        { name: 'seasonings' },
        { name: 'computers' },
        { name: 'automobile' },
        { name: 'bikes' }]);
    }
  } catch (err) {
    logger.error(err);
  }
};
