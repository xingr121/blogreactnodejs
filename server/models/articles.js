module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define("articles", {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  articles.associate = (models) => {
    articles.hasMany(models.comments, {
      onDelete: "cascade",
    });
  };

  return articles;
};
