const mongoose = require("mongoose");
const Lesson = require("./lessons");

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

courseSchema.pre("remove", async function (next) {
  const course = this;
  const lesson = await Lesson.deleteMany({ courseId: course._id });
  next();
});

const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;
