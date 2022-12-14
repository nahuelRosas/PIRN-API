const { PLE } = require("../utils/processLog.utils");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_URL_S, API_KEY } = process.env;

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
const GSBN = async (name) => {
  //GET STORE BY NAME
  try {
    let store = await Stores.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    return store[0];
  } catch (e) {
    return PLE(e, __filename);
  }
};
const MSA = async (array) => {
  //MAP STORE ARRANGEMENT
  try {
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
        return await GSBN(e);
      })
    );
    const checkResults = [];
    results.forEach((e) => {
      if (e !== undefined) {
        checkResults.push(e);
      }
    });
    return checkResults;
  } catch (e) {
    return PLE(e, __filename);
  }
};
const ASV = async (videoGame, stores) => {
  //ADD STORES VIDEOGAME
  try {
    const _stores = await MSA(stores);
    _stores[0] !== undefined ? videoGame.addStores(_stores) : null;
  } catch (e) {
    return PLE(e, __filename);
  }
};
module.exports = {
  ISDB, // IMPORT STORES DATA BASE
  ASV, //ADD STORES VIDEOGAME
};
