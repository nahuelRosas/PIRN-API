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
  if (!GDB.length) {
    try {
      const _GGA = await GGA();
      const response = await Genres.bulkCreate(_GGA);
      return response;
    } catch (e) {
      return PLE(e, __filename, "error");
    }
  }
  return GDB;
};

const GGBN = async (name) => {
  //GET GENRE BY NAME
  let genre = await Genres.findAll({
    where: { name: name },
  });
  return genre[0];
};

const MGA = async (array) => {
  //MAP GENRE ARRANGEMENT
  let newArr = [];
  if (!Array.isArray(array)) {
    if (typeof array !== "string") {
      return (array[0] = undefined);
    }
    newArr.push(array);
  } else {
    newArr = [...array];
  }
  const results = await Promise.all(
    array.map(async (e) => {
      return await GGBN(e);
    })
  );
  const checkResults = [];
  results.forEach((e) => {
    if (e !== undefined) {
      checkResults.push(e);
    }
  });
  return checkResults;
};

const AGV = async (videoGame, genres) => {
  //ADD GENRES VIDEOGAME
  const _genres = await MGA(genres);
  _genres[0] !== undefined ? videoGame.addGenres(_genres) : null;
};

module.exports = {
  IGDB, // IMPORT GENRES DATA BASE
  AGV, //ADD GENRES VIDEOGAME
};
