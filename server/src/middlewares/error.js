const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(error.message);
  error.message = err.message;

  if (err.code === 11000) {
    error = new ErrorResponse(
      "The email is not unique. Please add a new email"
    );
  }
  if (err.name === "ValidationError") {
    const msg = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(msg, 400);
  }
  if (err.message === "invalid signature") {
    error = new ErrorResponse(
      "You cannot access. Please authenticate yourself."
    );
  }

  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
