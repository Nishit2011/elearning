const jwt = require("jsonwebtoken");
const User = require("../models/users");
const asyncHandler = require("../middlewares/async");

exports.authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
  if (!user) throw new Error();
  req.token = token;
  req.user = user;

  next();
});
