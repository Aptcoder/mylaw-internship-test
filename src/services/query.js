const _ = require('lodash');
/**
 * 
 * @param {object} query - query object from express, contains keys and values fromurl
 * query parameters
 * @returns { findQueries, options } - findQueries is object to be used in the find query; options
 * are the query options-- sort value etc
 */
exports.getQueryData = (query) => {
  const queryEntries = _.pick(query, ['name', 'details']);
  const queryEntriesArray = Object.entries(queryEntries);
  const findQueries = {};
  const options = {
    sortBy: query.sortBy || 'createdAt',
    orderBy: query.orderBy || 'asc',
    skip: query.skip || 0,
    limit: query.limit || 20 // default limit
  };
  if (queryEntriesArray.length) {
    queryEntriesArray.forEach((entry) => {
      findQueries[entry[0]] = { $regex: entry[1], $options: 'i' };
    });
  }

  return { findQueries, options };
};
