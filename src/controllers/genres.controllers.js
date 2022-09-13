const { PLE } = require("../utils/processLog.utils");
const { API_URL_G, API_KEY } = process.env;
const axios = require("axios");

const { Genres } = require("../services/db.service");

const GGA = async () => {
  // GET GENRES API -- 19 Genres
  const genres = [];
  let URL = `${API_URL_G}?key=${API_KEY}`;
  try {
    let response =
      //{ status: 400 }; // ==> Test Catch Error
      await axios.get(URL);
    response.data.results.forEach((element) => {
      genres.push({
        id: element.id,
        name: element.name,
        image_background: element.image_background,
        games_count: element.games_count,
      });
    });
  } catch (e) {
    return PLE(e, __filename, "error");
  }
  return genres;
};

const IGDB = async () => {
  // IMPORT GENRES DATA BASE
  const GDB = await Genres.findAll({ raw: true });
  //GDB => Get DataBase
  try {
    if (!GDB.length) {
      const _GGA = await GGA();
      const response = await Genres.bulkCreate(_GGA);
      return response;
    }
  } catch (e) {
    return PLE(e, __filename, "error");
  }
  return GDB;
};

module.exports = {
  IGDB, // IMPORT GENRES DATA BASE
};
