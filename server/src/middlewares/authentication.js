const jwt = require("jsonwebtoken");
const User = require("../models/users");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.send("please authenticate yourself");
  }
};
module.exports = authenticate;
