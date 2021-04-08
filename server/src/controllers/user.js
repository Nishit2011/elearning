const User = require("../models/users");

exports.addUser = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const user = User(req.body);
    const token = await user.getAuthToken();
    // console.log(token);
    await user.save();
    // console.log(user);
    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByEmailPassword(email, password);
    const token = await user.getAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const count = users.length;
    res.send({ users, count });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const users = await User.remove();
    res.send({ users, count });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  console.log(user.email);
};
