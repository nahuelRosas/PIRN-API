const { Router } = require("express");
const { GGDBA, GGBNDB, CG } = require("../controllers/videogames.controllers");

const router = Router();
const { Videogames } = require("../services/db.service");

router.get("/", async (req, res) => {
  const name = req.query.name;

  let _GGDBA;
  name !== undefined
    ? (_GGDBA = await GGDBA(true, name))
    : (_GGDBA = await GGDBA(true));
  if (!_GGDBA.length) {
    return res.status(404).send("CODE: 404, Not Found");
  }
  res.send(_GGDBA);
});

router.post("/", async (req, res) => {
  let {
    name,
    released,
    background_image,
    rating,
    platforms,
    genres,
    stores,
    description,
  } = req.body;
  if (!name || !description || !platforms) {
    return res
      .status(400)
      .send("CODE: 400, Bad request: Missing required parameters");
  }
  const _GGBNDB = await GGBNDB(name);
  if (_GGBNDB.length != 0) {
    return res
      .status(409)
      .send("CODE: 409, Conflict: The name is already in use.");
  }
  await CG({
    name,
    released,
    background_image,
    rating,
    platforms,
    genres,
    stores,
    description,
  });
  const _GGDBA = await GGDBA(true, name);
  res.send(_GGDBA);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id.includes("-")) {
      let allVideogames = await getAllVideogames(); // me trae todo

      let idGame = await allVideogames.filter((e) => e.id === parseInt(id));

      if (idGame.length > 0) {
        const detalle = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        const description = detalle.data.description_raw;
        idGame[0]["description"] = description;
        res.status(200).send(idGame);
      }
    } else {
      let gameFound = await Videogame.findByPk(id, {
        include: [
          {
            model: Genres,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      var arreglo = [];
      arreglo.push(gameFound);

      res.status(200).json(arreglo);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
