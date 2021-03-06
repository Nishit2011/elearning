const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteAllUsers,
  loginUser,
  deleteUserById,
  addProfilePic,
  removeProfilePic,
  getProfilePic,
  getCoursesByAuthor,
  logout,
} = require("../controllers/user");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorisation");
const { upload } = require("../utils/fileupload");

const router = express.Router();

router
  .post("/signup", addUser)
  .get("/allusers", authenticate, authorize("admin"), getAllUsers)
  .delete("/deleteusers", authenticate, authorize("admin"), deleteAllUsers)
  .delete(
    "/deleteuser/:id",
    authenticate,
    authorize("admin", "instructor"),
    deleteUserById
  )
  .post("/login", loginUser)
  .post(
    "/user/profilepic",
    authenticate,
    upload.single("avatar"),
    addProfilePic
  )
  .delete("/user/profilepic/", authenticate, removeProfilePic)
  .get("/user/:id/profilepic", getProfilePic)
  .get("/user/:id/courses", authenticate, getCoursesByAuthor)
  .post("/logout", authenticate, logout);

module.exports = router;
