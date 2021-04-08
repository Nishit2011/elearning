class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    console.log(statusCode);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
