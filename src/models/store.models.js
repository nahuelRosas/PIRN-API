const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class store extends Model {}

  store.init(
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
      domain: {
        type: DataTypes.TEXT,
      },
      games_count: {
        type: DataTypes.INTEGER,
      },
      image_background: {
        type: DataTypes.TEXT,
      },
    },
    { sequelize: sequelize, modelName: "stores", timestamps: false }
  );
};
