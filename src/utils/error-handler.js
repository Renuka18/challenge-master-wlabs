const { HTTPError } = require('./http-error');

const handleErrors = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}


module.exports = handleErrors;