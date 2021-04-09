const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title of course"],
    },
    content: {
      type: String,
      required: [true, "Please provide course content"],
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    subscribedAt: {
      type: Date,
      default: Date.now(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
courseSchema.virtual("lesson", {
  ref: "lesson",
  localField: "_id",
  foreignField: "courseId",
});
const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;
