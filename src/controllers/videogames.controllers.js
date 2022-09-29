const { PLE } = require("../utils/processLog.utils");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_URL_V, API_KEY } = process.env;

const {
  Videogames,
  Genres,
  Platforms,
  Stores,
} = require("../services/db.service");

const config = {
  headers: {
    "Accept-Encoding": "gzip",
  },
};
// !! -- GAMES BY API
const GGA = async () => {
  // GET GAMES API -- 120 Games
  const games = [];

  let URL = `${API_URL_V}?key=${API_KEY}&page_size=40`;
  for (let i = 1; i <= 3; i++) {
    try {
      let response = await axios.get(URL, config);
      response.data.results.forEach((element) => {
        games.push({
          id: element.id,
          name: element.name,
          released: element.released,
          background_image: element.background_image,
          rating: element.rating,
          platforms:
            element.platforms !== null
              ? element.platforms.map((e) => e.platform.name)
              : null,
          genres:
            element.genres !== null ? element.genres.map((e) => e.name) : null,
          stores:
            element.stores !== null
              ? element.stores.map((e) => e.store.name)
              : null,
        });
      });

      URL = response.data.next;
    } catch (e) {
      return PLE(e, __filename, "error");
    }
  }
  return games;
};

const GGBNA = async (Name) => {
  // GET GAMES BY NAME API -- 20 Games
  const games = [];

  let URL = `${API_URL_V}?key=${API_KEY}&search=${Name}`;

  try {
    let response = await axios.get(URL, config);
    response.data.results.forEach((element) => {
      games.push({
        id: element.id,
        name: element.name,
        released: element.released,
        background_image: element.background_image,
        rating: element.rating,
        platforms:
          element.platforms !== null
            ? element.platforms.map((e) => e.platform.name)
            : null,
        genres:
          element.genres !== null ? element.genres.map((e) => e.name) : null,
        stores:
          element.stores !== null
            ? element.stores.map((e) => e.store.name)
            : null,
      });
    });
    return games;
  } catch (e) {
    return PLE(e, __filename, "error");
  }
};

const GGBIA = async (ID) => {
  // GET GAMES BY ID API -- 1 Game
  let game = {};

  let URL = `${API_URL_V}/${ID}?key=${API_KEY}`;

  try {
    let response = await axios.get(URL, config);
    game = {
      id: response.data.id,
      name: response.data.name,
      released: response.data.released,
      description: response.data.description_raw,
      background_image: response.data.background_image,
      rating: response.data.rating,
      platforms: response.data.platforms.map((e) => e.platform.name),
      genres: response.data.genres.map((e) => e.name),
      stores: response.data.stores.map((e) => e.store.name),
      tags: response.data.tags.map((e) => e.name),
    };
    return game;
  } catch (e) {
    return PLE(e, __filename, "error");
  }
};

// !! -- GAMES BY DB

const GGDB = async () => {
  // GET GAMES DATABASE -- All Games in DB
  const games = [];
  try {
    let response = await Videogames.findAll({
      include: [
        {
          model: Genres,
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          through: {
            attributes: [],
          },
        },
        {
          model: Stores,
          through: {
            attributes: [],
          },
        },
      ],
    });
    response.forEach((element) => {
      games.push({
        id: element.dataValues.id,
        name: element.dataValues.name,
        released: element.dataValues.released,
        background_image: element.dataValues.background_image,
        rating: element.dataValues.rating,
        platforms: element.dataValues.platforms.map((e) => e.dataValues.name),
        genres: element.dataValues.genres.map((e) => e.dataValues.name),
        stores: element.dataValues.stores.map((e) => e.dataValues.name),
        description: element.dataValues.description,
        createDB: element.dataValues.createDB,
      });
    });
    return games;
  } catch (e) {
    return PLE(e, __filename);
  }
};

const GGBNDB = async (Name) => {
  // GET GAMES BY NAME DATABASE -- 20 Games in DB
  const games = [];

  try {
    let response = await Videogames.findAll({
      where: {
        name: { [Op.iLike]: `%${Name}%` },
      },
      include: [
        {
          model: Genres,
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          through: {
            attributes: [],
          },
        },
        {
          model: Stores,
          through: {
            attributes: [],
          },
        },
      ],
    });
    response.forEach((element) => {
      games.push({
        id: element.dataValues.id,
        name: element.dataValues.name,
        released: element.dataValues.released,
        background_image: element.dataValues.background_image,
        rating: element.dataValues.rating,
        platforms: element.dataValues.platforms.map((e) => e.dataValues.name),
        genres: element.dataValues.genres.map((e) => e.dataValues.name),
        stores: element.dataValues.stores.map((e) => e.dataValues.name),
        description: element.dataValues.description,
        createDB: element.dataValues.createDB,
      });
    });
    return games;
  } catch (e) {
    return PLE(e, __filename);
  }
};

const GGBIDB = async (ID) => {
  // GET GAMES BY ID DATABASE
  try {
    let response = await Videogames.findByPk(ID, {
      include: [
        {
          model: Genres,
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          through: {
            attributes: [],
          },
        },
        {
          model: Stores,
          through: {
            attributes: [],
          },
        },
      ],
    });
    let game = {
      id: response.dataValues.id,
      name: response.dataValues.name,
      released: response.dataValues.released,
      background_image: response.dataValues.background_image,
      rating: response.dataValues.rating,
      platforms: response.dataValues.platforms.map((e) => e.dataValues.name),
      genres: response.dataValues.genres.map((e) => e.dataValues.name),
      stores: response.dataValues.stores.map((e) => e.dataValues.name),
      description: response.dataValues.description,
      createDB: response.dataValues.createDB,
    };
    return game;
  } catch (e) {
    return PLE(e, __filename);
  }
};

// !! -- GAMES CONCAT
const GGDBA = async (testing = false, name) => {
  // GET GAMES DATABASE & API
  try {
    if (name === undefined) {
      const _GGDB = await GGDB();
      if (!testing) {
        const _GGA = await GGA();
        const results = [..._GGA, ..._GGDB];
        return results;
      }

      return _GGDB;
    }

    const _GGBNDB = await GGBNDB(name);

    if (!testing) {
      const _GGBNA = await GGBNA(name);
      if (_GGBNA && _GGBNDB) {
        const results = [..._GGBNDB, ..._GGBNA];
        return results;
      }
      return "Not Found";
    }

    return _GGBNDB;
  } catch (e) {
    return PLE(e, __filename);
  }
};

const GGDBABI = async (ID) => {
  // GET GAME DATABASE & API BY ID
  try {
    if (!ID.includes("-")) {
      let _GGBIA = await GGBIA(ID);
      return _GGBIA;
    }
    let _GGBIDB = await GGBIDB(ID);
    return _GGBIDB;
  } catch (e) {
    return PLE(e, __filename);
  }
};

//! -- CREATE GAME
const CG = async (OBJ) => {
  //CREATE GAME
  const { AGV } = require("../controllers/genres.controllers");
  const { APV } = require("../controllers/platforms.controllers");
  const { ASV } = require("../controllers/stores.controllers");
  const {
    name,
    released,
    background_image,
    rating,
    platforms,
    genres,
    stores,
    description,
  } = OBJ;
  const game = await Videogames.create({
    name: name,
    released: released,
    background_image: background_image,
    rating: rating,
    description: description,
  });

  if (genres !== undefined) AGV(game, genres);
  if (platforms !== undefined) APV(game, platforms);
  if (stores !== undefined) ASV(game, stores);
  return await GGBNDB(name);
};

module.exports = {
  GGA, // GET GAMES API -- 120 Games
  GGBNA, // GET GAMES BY NAME API -- 20 Games
  GGBIA, // GET GAME BY ID API -- 1 Game
  GGDB, // GET GAMES DATABASE -- All Games in DB
  GGBNDB, // GET GAMES BY NAME DATABASE
  GGDBA, // GET GAME BY DATABASE & API
  CG, //CREATE GAME
  GGDBABI, // GET GAME DATABASE & API BY ID
};
