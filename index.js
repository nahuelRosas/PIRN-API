const { preLoad } = require("./src/utils/preLoad.utils");
const { PLE } = require("./src/utils/processLog.utils");
const { conn } = require("./src/services/db.service");

// const server = require("./src/configs/server.config");

const server = require("./src/middlewares/index");

require("dotenv").config();
const { EX_PORT, RESET_DB } = process.env;

let message = `Starting API`;
PLE(message, __filename, "rainbow", true);

conn.sync({ force: RESET_DB }).then(() => {
  server.listen(EX_PORT, () => {
    let message = `Listening on port: ${EX_PORT}`;
    PLE(message, __filename, "warning");
    preLoad();
  });
});

//TEST
// const { GGBNDB } = require("./src/controllers/videogames.controllers");
// const { Videogames } = require("./src/services/db.service");
// Videogames.create({
//   name: "Nahuel",
//   description: "Hola",
//   rating: 5,
// });
// GGBNDB("Na").then((result) => console.log(result));
