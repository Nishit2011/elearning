const asyncHandler = require("../middlewares/async");
const Course = require("../models/courses");
const Lesson = require("../models/lessons");

exports.addCourse = asyncHandler(async (req, res, next) => {
  const authorId = req.user._id;
  if (!authorId) return "Author doesnot exist";
  const course = Course(req.body);
  course.author = authorId;
  await course.save();
  res.send(course);
});

exports.getCourseDetailsById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  if (!courseId) res.send({ success: false, message: "Course doesnot exist" });
  const course = await Course.findById(courseId);
  await course.populate("author").execPopulate();
  res.send(course);
});

exports.getAllCourses = asyncHandler(async (req, res, next) => {
  console.log("getAllCourses");
  const authorId = req.params.id;
  console.log(authorId);
  const course = await Course.find({ author: authorId });
  await course.populate("author").execPopulate();
  console.log(course.author);
});
