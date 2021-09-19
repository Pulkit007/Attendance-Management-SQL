module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roll: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Student;
};
