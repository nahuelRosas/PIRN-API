const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class platform extends Model {}

  platform.init(
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
      games_count: {
        type: DataTypes.INTEGER,
      },
      image_background: {
        type: DataTypes.TEXT,
      },
    },
    { sequelize: sequelize, modelName: "platforms", timestamps: false }
  );
};
