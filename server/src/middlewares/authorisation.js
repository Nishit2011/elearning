const ErrorResponse = require("../utils/ErrorResponse");

const authorize = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

module.exports = authorize;
