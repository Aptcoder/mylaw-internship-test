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
  let orderBy;
  if (['asc', 'desc'].includes(query.orderBy)) {
    orderBy = query.orderBy;
  }
  let sortBy;
  if (['name', 'details'].includes(query.sortBy)) {
    sortBy = query.sortBy;
  }
  let skip;
  if (typeof parseInt(query.skip, 10) === 'number') {
    skip = parseInt(query.skip, 10);
  }
  let limit;
  if (typeof parseInt(query.limit, 10) === 'number') {
    limit = parseInt(query.limit, 10);
  }
  const options = {
    sortBy: sortBy || 'createdAt',
    orderBy: orderBy || 'asc',
    skip: skip || 0,
    limit: limit || 20 // default limit
  };
  if (queryEntriesArray.length) {
    queryEntriesArray.forEach((entry) => {
      findQueries[entry[0]] = { $regex: entry[1], $options: 'i' };
    });
  }

  return { findQueries, options };
};
