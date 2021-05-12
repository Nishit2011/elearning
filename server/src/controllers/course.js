const e = require("express");
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
  if (!courseId) {
    res.send({ success: false, message: "Course doesnot exist" });
  } else {
    const course = await Course.findById(courseId);
    await course.populate("author").execPopulate();
    res.send(course);
  }
});

exports.getAllCourses = asyncHandler(async (req, res, next) => {
  const authorId = req.params.id;
  const course = await Course.find({ author: authorId });

  if (!course) {
    res.send({ success: true, message: "Course does not exist" });
  }
  await course.populate("author").execPopulate();
  res.send({ success: true, courses: course });
});

exports.deleteCourseById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);

  if (
    req.user._id.toString() === course.author.toString() ||
    req.user.role === "admin"
  ) {
    await course.remove();
    res.send({
      success: true,
      message: `Course with id of ${courseId} has been successfully deleted`,
    });
    return true;
  }
  res.send({
    success: true,
    message: "Only admin and creator of course can delete the course",
  });
});

exports.editCoursesById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;

  const authorId = req.user._id;

  const course = await Course.findOne({ _id: courseId, author: authorId });
  if (!course) {
    res.send({ success: false, message: "No course found!" });
  } else {
    const updates = Object.keys(req.body);
    const allowedUpdateFields = ["title", "content"];
    const isValidOperation = updates.every((update) =>
      allowedUpdateFields.includes(update)
    );
    if (!isValidOperation) {
      res.status(500).send({ error: "Invalid fields for update" });
    } else {
      updates.forEach((update) => (course[update] = req.body[update]));
      await course.save();
      res.send(course);
    }
  }
});
