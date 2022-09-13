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

// !! -- GAMES BY API
const GGA = async () => {
  // GET GAMES API -- 120 Games
  const games = [];

  let URL = `${API_URL_V}?key=${API_KEY}&page_size=40`;

  for (let i = 1; i <= 3; i++) {
    try {
      let response =
        //{ status: 400 }; // ==> Test Catch Error
        await axios.get(URL);
      response.data.results.forEach((element) => {
        games.push({
          id: element.id,
          name: element.name,
          released: element.released,
          background_image: element.background_image,
          rating: element.rating,
          platforms: element.platforms.map((e) => e.platform.name),
          genres: element.genres.map((e) => e.name),
          stores: element.stores.map((e) => e.store.name),
          tags: element.tags.map((e) => e.name),
        });
      });
      URL = response.data.next;
    } catch (e) {
      const basename = path.basename(__filename);
      return PLE(e, basename);
    }
  }
  return games;
};

const GGBNA = async (Name) => {
  // GET GAMES BY NAME API -- 20 Games
  const games = [];

  let URL = `${API_URL_V}?key=${API_KEY}&search=${Name}`;

  try {
    let response =
      //{ status: 400 }; ==> Test Catch Error
      await axios.get(URL);

    response.data.results.forEach((element) => {
      games.push({
        id: element.id,
        name: element.name,
        released: element.released,
        background_image: element.background_image,
        rating: element.rating,
        platforms: element.platforms.map((e) => e.platform.name),
        genres: element.genres.map((e) => e.name),
        stores: element.stores.map((e) => e.store.name),
        tags: element.tags.map((e) => e.name),
      });
    });
    return games;
  } catch (e) {
    return PLE(e, __filename);
  }
};

const GGBIA = async (ID) => {
  // GET GAMES BY ID API -- 1 Game
  let game = {};

  let URL = `${API_URL_V}/${ID}?key=${API_KEY}`;

  try {
    let response = await axios.get(URL);
    game = {
      id: response.data.id,
      name: response.data.name,
      released: response.data.released,
      background_image: response.data.background_image,
      rating: response.data.rating,
      platforms: response.data.platforms.map((e) => e.platform.name),
      genres: response.data.genres.map((e) => e.name),
      stores: response.data.stores.map((e) => e.store.name),
      tags: response.data.tags.map((e) => e.name),
    };
    return game;
  } catch (e) {
    return PLE(e, __filename);
  }
};

// TODO -- GAMES BY DB

const GGDB = async () => {
  // GET GAMES DATABASE -- All Games in DB
  try {
    let response = await Videogames.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    let games = {
      id: response.id,
      name: response.name,
      released: response.released,
      background_image: response.background_image,
      rating: response.rating,
      platforms: response.platforms.map((e) => e.platform.name),
      genres: response.genres.map((e) => e.name),
      stores: response.stores.map((e) => e.store.name),
      tags: response.tags.map((e) => e.name),
    };
    return games;
  } catch (e) {
    return PLE(e, __filename);
  }
};

const GGBNDB = async (Name) => {
  // GET GAMES BY NAME DATABASE -- 20 Games in DB
  try {
    let response = await Videogames.findAll({
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platforms,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Stores,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
      name: {
        [Op.like]: `%${Name}%`,
      },
    });

    // let games = {
    //   id: response.id,
    //   name: response.name,
    //   released: response.released,
    //   background_image: response.background_image,
    //   rating: response.rating,
    //   platforms: response.platforms.map((e) => e.platform.name),
    //   genres: response.genres.map((e) => e.name),
    //   stores: response.stores.map((e) => e.store.name),
    //   tags: response.tags.map((e) => e.name),
    // };
    return response;
  } catch (e) {
    return PLE(e, __filename);
  }
};

const infoAll = async () => {
  const api = await infoApi();
  const db = await infoDb();
  const infoTotal = [...api, ...db];
  return infoTotal;
};

const infoById = async (id) => {
  if (typeof id === "string" && id.length > 8) {
    const infoIdDb = await Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return infoIdDb;
  } else {
    const infoIdApi = await axios.get(`${URL}/${id}?key=${APIKEY}`);
    const e = infoIdApi.data;
    const info = {
      id: e.id,
      name: e.name,
      image: e.background_image,
      description: e.description_raw,
      released: e.released,
      rating: e.rating,
      platform: e.platforms.map((e) => e.platform.name),
      genres: e.genres.map((e) => e.name),
    };
    return info;
  }
};

// GGBNDB("Na").then((result) => console.log(result));

module.exports = {
  GGA, // GET GAMES API -- 120 Games
  GGBNA, // GET GAMES BY NAME API -- 20 Games
  GGBIA, // GET GAME BY ID API -- 1 Game
  GGDB, // GET GAMES DATABASE -- All Games in DB
  GGBNDB,
};
