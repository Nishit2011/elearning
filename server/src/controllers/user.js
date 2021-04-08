const User = require("../models/users");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");
const sharp = require("sharp");

exports.addUser = asyncHandler(async (req, res, next) => {
  const user = User(req.body);
  const token = await user.getAuthToken();
  // console.log(token);
  await user.save();
  // console.log(user);
  res.send({ user, token });
});

exports.addProfilePic = asyncHandler(async (req, res, next) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();

  req.user.avatar = buffer;
  await req.user.save();
  res.send();
});

exports.removeProfilePic = asyncHandler(async (req, res, next) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

exports.getProfilePic = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user || !user.avatar) {
    throw new Error();
  }

  res.set("Content-Type", "image/png");
  res.send(user.avatar);
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findUserByEmailPassword(email, password);
  const token = await user.getAuthToken();
  res.send({ user, token });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  const count = users.length;
  res.send({ users, count });
});

exports.deleteAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.remove();
  res.send({ users, count });
});

exports.deleteUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  console.log(user.email);
};
