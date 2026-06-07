const CustomError = require('../utils/customError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // GitHub API errors (axios)
  if (err.response) {
    if (err.response.status === 404) {
      error = new CustomError('GitHub user not found', 404);
    } else if (err.response.status === 403 || err.response.status === 429) {
      error = new CustomError('GitHub API rate limit exceeded. Try again later.', 429);
    } else {
      error = new CustomError('Error communicating with GitHub API', err.response.status);
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
