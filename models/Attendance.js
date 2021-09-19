const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define("Attendance", {
    roll: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      get: function () {
        return moment.utc(this.getDataValue("date")).format("YYYY-MM-DD");
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Attendance;
};
