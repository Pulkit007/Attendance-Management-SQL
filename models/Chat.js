module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    from: {
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
    msg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Chat;
};
