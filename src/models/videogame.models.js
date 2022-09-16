const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class videogame extends Model {}

  videogame.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
      released: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      background_image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://cdna.artstation.com/p/assets/images/images/011/480/320/large/nemeth-laszlo-bestvideogames-50p-full.jpg?1529801751",
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      createDB: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { sequelize: sequelize, modelName: "videogames", timestamps: false }
  );
};
