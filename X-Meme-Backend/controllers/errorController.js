const AppError = require("./../utils/appError");

// Used for handling Cast Error
const handleCastErrorDB = (err) => {
  const message = `Invalid Fields`;
  return new AppError(message, 404);
};

// Used for handling Duplicate Field Error
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value`;
  return new AppError(message, 409);
};

// Used for handling Validation Error
const handleValidationErrorDB = (err) => {
  const message = `Invalid Input Data`;
  return new AppError(message, 400);
};

// Used for sending response when running in Development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Used for sending response when running in Production
const sendErrorProd = (err, res) => {
  // Checking whether custom error or not
  // i.e. instance of AppError class
  if (err.isOperational) {
    res.status(err.statusCode).end();
  } else {
    res.status(500).end();
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.stack && err.stack.startsWith("CastError"))
      error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
