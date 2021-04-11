const express = require("express");
const {
  addLesson,
  getLessonsByCourseId,
  editLessonById,
} = require("../controllers/lesson");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorisation");

const router = express.Router();

router
  .post("/:id/lesson", authenticate, authorize("instructor"), addLesson)
  .get("/:id/lessons", authenticate, getLessonsByCourseId)
  .patch("/:courseid/course/:lessonid/lesson", authenticate, editLessonById);

module.exports = router;
