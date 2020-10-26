class AppError extends Error {
  constructor(status, message) {
    super();
    this.statusCode = status;
    this.message = message;
  }
}

const handleError = (res, err) => {
  const statusCode = err.statusCode || 500;
  const message = err.message.trim() || 'Something went wrong';
  return res.status(statusCode).send({
    status: 'error',
    message
  });
};

module.exports = { AppError, handleError };
