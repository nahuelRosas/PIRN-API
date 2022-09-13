const { PLE } = require("../utils/processLog.utils");
const { API_URL_S, API_KEY } = process.env;
const axios = require("axios");

const { Stores } = require("../services/db.service");

const GSA = async () => {
  // GET STORE API -- 10 Stores
  const Stores = [];
  let URL = `${API_URL_S}?key=${API_KEY}`;
  try {
    let response =
      //{ status: 400 }; // ==> Test Catch Error
      await axios.get(URL);
    response.data.results.forEach((element) => {
      Stores.push({
        id: element.id,
        name: element.name,
        domain: element.domain,
        games_count: element.games_count,
        image_background: element.image_background,
      });
    });
  } catch (e) {
    return PLE(e, __filename, "error");
  }
  return Stores;
};

const ISDB = async () => {
  // IMPORT STORES DATA BASE
  const GDB = await Stores.findAll({ raw: true });
  //GDB => Get DataBase
  try {
    if (!GDB.length) {
      const _GSA = await GSA();
      const response = await Stores.bulkCreate(_GSA);
      return response;
    }
  } catch (e) {
    return PLE(e, __filename);
  }
  return GDB;
};

module.exports = {
  ISDB, // IMPORT STORES DATA BASE
};
