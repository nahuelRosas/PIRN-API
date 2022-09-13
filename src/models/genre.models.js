const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class genre extends Model {}

  genre.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_background: {
        type: DataTypes.TEXT,
      },
      games_count: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize: sequelize, modelName: "genres", timestamps: false }
  );
};
