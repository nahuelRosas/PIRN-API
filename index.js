const { preLoad } = require("./src/utils/preLoad.utils");
const { PLE } = require("./src/utils/processLog.utils");
const { conn } = require("./src/services/db.service");

const server = require("./src/server/index");

require("dotenv").config();
const { EX_PORT, RESET_DB, EX_PROTOCOL } = process.env;

let message = `Starting API`;
PLE(message, __filename, "rainbow", true);

conn.sync({ force: RESET_DB }).then(() => {
  server.listen(EX_PORT, () => {
    let message =
      EX_PROTOCOL === "https"
        ? `Secure Server on port: ${EX_PORT}`
        : `Insecure Server on port ${EX_PORT}`;
    PLE(message, __filename, "warning");
    preLoad();
  });
});
