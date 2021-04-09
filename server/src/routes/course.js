const express = require("express");
const {
  addCourse,
  getAllCourses,
  getCourseDetailsById,
} = require("../controllers/course");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorisation");

const router = express.Router();

router
  .post("/course", authenticate, authorize("instructor"), addCourse)
  .get("/:id/courses/", authenticate, getAllCourses)
  .get("/:id/coursedetails", authenticate, getCourseDetailsById);

module.exports = router;
