module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define("comments", {
    commentBody: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return comments;
};
