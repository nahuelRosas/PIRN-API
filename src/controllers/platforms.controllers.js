const { PLE } = require("../utils/processLog.utils");
const { API_URL_P, API_KEY } = process.env;
const axios = require("axios");

const { Platforms } = require("../services/db.service");

const GPA = async () => {
  // GET PLATFORMS API -- 50 Platforms
  const Platforms = [];
  let URL = `${API_URL_P}?key=${API_KEY}`;
  try {
    let response =
      //{ status: 400 }; // ==> Test Catch Error
      await axios.get(URL);
    response.data.results.forEach((element) => {
      Platforms.push({
        id: element.id,
        name: element.name,
        games_count: element.games_count,
        image_background: element.image_background,
      });
    });
  } catch (e) {
    return PLE(e, __filename, "error");
  }
  return Platforms;
};

const IPDB = async () => {
  // IMPORT PLATFORMS DATA BASE
  const GDB = await Platforms.findAll({ raw: true });
  //GDB => Get DataBase
  try {
    if (!GDB.length) {
      const _GPA = await GPA();
      const response = await Platforms.bulkCreate(_GPA);
      return response;
    }
  } catch (e) {
    return PLE(e, __filename, "error");
  }
  return GDB;
};

module.exports = {
  IPDB, // IMPORT PLATFORMS DATA BASE
};
