const { conn } = require("../configs/db.config");

const path = require("path");
const fs = require("fs");

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )

  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

modelDefiners.forEach((model) => model(conn));

let entries = Object.entries(conn.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

conn.models = Object.fromEntries(capsEntries);

const { Genres, Platforms, Stores, Videogames } = conn.models;

Videogames.belongsToMany(Genres, {
  through: "videogames_genres",
});
Genres.belongsToMany(Videogames, {
  through: "videogames_genres",
});
Videogames.belongsToMany(Platforms, {
  through: "videogames_platforms",
});
Platforms.belongsToMany(Videogames, {
  through: "videogames_platforms",
});
Videogames.belongsToMany(Stores, {
  through: "videogames_stores",
});
Stores.belongsToMany(Videogames, {
  through: "videogames_stores",
});

module.exports = {
  ...conn.models,
  conn: conn,
};
