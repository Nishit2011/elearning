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
  const course = await Course.findById(courseId);
  const lesson = await Lesson.find({ courseId });

  await course.populate("author").execPopulate();

  res.send({
    totalLessons: lesson.length,
    createdBy: `${course.author.firstName} ${course.author.lastName}`,
    creatorEmail: `${course.author.email}`,
    createdOn: `${course.author.createdAt}`,
    lessons: lesson,
  });
});

exports.editLessonById = asyncHandler(async (req, res) => {
  const authorId = req.user._id;
  const courseId = req.params.courseid;
  const lessonId = req.params.lessonid;

  const course = await Course.findOne({ author: authorId, _id: courseId });
  if (!course) {
    res.send({ success: false, message: "Course is not available" });
  } else {
    const lesson = await Lesson.findOne({ courseId, _id: lessonId });
    if (!lesson) {
      res.send({ success: false, message: "Lesson is not available" });
    } else {
      //update logic for lesson
      const updates = Object.keys(req.body);
      const allowedUpdates = ["name", "content"];
      const isValidUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
      );
      if (!isValidUpdate) {
        res.send({
          success: false,
          message: "Selected fields are not present or allowed",
        });
      } else {
        updates.forEach((update) => (lesson[update] = req.body[update]));
        await lesson.save();
        res.send(lesson);
      }
    }
  }
});
