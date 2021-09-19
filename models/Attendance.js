const mongoose = require("mongoose");
const moment = require("moment");

const attendanceSchema = new mongoose.Schema({
  roll: {
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
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    get: function () {
      return moment.utc(this.getDataValue("date")).format("YYYY-MM-DD");
    },
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Attendance = mongoose.model("Attendance", attendanceSchema);
