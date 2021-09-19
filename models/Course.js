module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    dept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faculty: {
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
    archived: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false,
    },
  });
  return Course;
};
