const { IGDB } = require("../controllers/genres.controllers");
const { IPDB } = require("../controllers/platforms.controllers");
const { ISDB } = require("../controllers/stores.controllers");

const { PLE } = require("../utils/processLog.utils");

const preLoad = async () => {
  try {
    IGDB();
    IPDB();
    ISDB();
    let message = `Databases have been preloaded successfully`;
    PLE(message, __filename, "success");
  } catch (e) {
    return PLE(e, __filename, "error");
  }
};
module.exports = { preLoad };
