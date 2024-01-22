module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  });

  return users;
};
