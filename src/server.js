const http = require('http');
const app = require('./api/app');
const logger = require('./config/logger');
require('./config/db');

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};
  // normalize and set the port
const port = normalizePort(process.env.PORT || '5000');

// create a http server
http.createServer(app)
  .listen(port, () => {
    logger.info(`Server is listening at port ${port}`);
  });
