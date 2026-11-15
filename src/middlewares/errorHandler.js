const { mapUspError } = require('../utils/uspError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // Log để dev dễ debug (production nên ghi ra file hoặc bỏ)
  if (process.env.NODE_ENV !== 'test') {
    console.error('[Error]', {
      method: req.method,
      url: req.originalUrl,
      code: err.code || err.sqlState,
      message: err.sqlMessage || err.message,
    });
  }

  const mapped = mapUspError(err);

  res.status(mapped.status).json({
    success: false,
    message: mapped.message,
    code: mapped.code,
  });
};