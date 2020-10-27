const _ = require('lodash');

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
