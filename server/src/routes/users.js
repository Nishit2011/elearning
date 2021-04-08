const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteAllUsers,
  loginUser,
  deleteUserById,
} = require("../controllers/user");
const authenticate = require("../middlewares/authentication");
const authorize = require("../middlewares/authorisation");

const router = express.Router();

router
  .post("/signup", addUser)
  .get("/allusers", authenticate, authorize("admin"), getAllUsers)
  .delete("/deleteusers", authenticate, authorize("admin"), deleteAllUsers)
  .delete("/deleteuser/:id", deleteUserById)
  .post("/login", loginUser);

module.exports = router;
