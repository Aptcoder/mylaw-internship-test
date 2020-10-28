const winston = require('winston');
const path = require('path');

const myformat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const options = {
  file: {
    level: 'info',
    filename: path.join('logs', 'app-logs.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  format: myformat,
  transports: [new winston.transports.Console(options.console),
    new winston.transports.File(options.file)],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
