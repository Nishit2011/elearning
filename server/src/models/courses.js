const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    subscribe: {
      type: Boolean,
    },
    subscribedAt: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;
