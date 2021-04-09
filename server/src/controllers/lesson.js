const Lesson = require("../models/lessons");
const Course = require("../models/courses");
const asyncHandler = require("../middlewares/async");

exports.addLesson = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course) return "Course doesnot exist";

  if (course.author.toString() !== req.user._id.toString()) {
    return "You cannot add lesson";
  }

  const lesson = Lesson(req.body);
  lesson.courseId = courseId;
  await lesson.save();
  res.send(lesson);
});

exports.getLessonsByCourseId = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const lesson = await Lesson.find({ courseId });
  const course = await Course.findById(courseId);
  await course.populate("author").execPopulate();

  res.send({
    totalLessons: lesson.length,
    createdBy: `${course.author.firstName} ${course.author.lastName}`,
    creatorEmail: `${course.author.email}`,
    createdOn: `${course.author.createdAt}`,
    lessons: lesson,
  });
});
