const Category = require('../api/components/category/model');
const Product = require('../api/components/product/model');
const logger = require('../config/logger');

exports.seedCategories = async () => {
  try {
    await Category.insertMany([
      { name: 'clothes', details: 'Leather and all type of hand clothing' },
      { name: 'face caps' },
      { name: 'bandana' },
      { name: 'drums' },
      { name: 'music' },
      { name: 'art' },
      { name: 'laptops' },
      { name: 'school' },
      { name: 'univerity' },
      { name: 'beaches' },
      { name: 'hotels' },
      { name: 'small' },
      { name: 'big' }
    ]);
  } catch (err) {
    logger.error(err);
  }
};

exports.seedProducts = async () => {
  try {
    await Product.insertMany([
      { name: 'Rice', price: 600, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Beans', price: 667, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Chicken', price: 650, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Egusi Soup', price: 900, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Plantain', price: 78800, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Dodo', price: 690, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Potato', price: 780, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Yam', price: 4673, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Yam porrigde', price: 463, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Yam sauce', price: 423, categories: ['5f996f34708ca20017b96059'] },
      { name: 'boiled yam', price: 493, categories: ['5f996f34708ca20017b96059'] },
      { name: 'Salt', price: 493, categories: ['5f996f34708ca20017b9605a'] },
      { name: 'maggi', price: 423, categories: ['5f996f34708ca20017b9605a'] },
      { name: 'gino', price: 4365, categories: ['5f996f34708ca20017b9605a'] },
      { name: 'garlic', price: 389333, categories: ['5f996f34708ca20017b9605a'] },
      { name: 'Milk', price: 4573, categories: ['5f996f34708ca20017b9605a'] },
      { name: 'pepper', price: 3733, categories: ['5f996f34708ca20017b9605a'] },
      { name: 'benz', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'camry', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'toyota', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'v4', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'peugeot', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'Ferrari', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'Bugatti', price: 3733, categories: ['5f996f34708ca20017b9605c'] },
      { name: 'tesla', price: 3733, categories: ['5f996f34708ca20017b9605c'] }
    ]);
  } catch (err) {
    logger.error(err);
  }
};
