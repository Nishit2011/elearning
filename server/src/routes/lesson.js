const express = require("express");
const { addLesson, getLessonsByCourseId } = require("../controllers/lesson");
const { authenticate } = require("../middlewares/authentication");
const { authorize } = require("../middlewares/authorisation");

const router = express.Router();

router
  .post("/:id/lesson", authenticate, authorize("instructor"), addLesson)
  .get("/:id/lessons", authenticate, getLessonsByCourseId);

module.exports = router;
