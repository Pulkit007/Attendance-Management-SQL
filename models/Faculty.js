const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
});

module.exports = Faculty = mongoose.model("faculty", facultySchema);
