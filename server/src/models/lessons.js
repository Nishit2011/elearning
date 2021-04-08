const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
  index: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: [true, "Please enter lesson name"],
  },
  content: {
    type: String,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const Lesson = new mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
