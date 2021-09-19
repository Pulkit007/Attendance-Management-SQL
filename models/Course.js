const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = Course = mongoose.model("Course", courseSchema);
