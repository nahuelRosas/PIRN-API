const { Router } = require("express");
const {
  GGDBA,
  GGBNDB,
  CG,
  GGDBABI,
} = require("../controllers/videogames.controllers");
const router = Router();
const { PLE } = require("../utils/processLog.utils");

const TESTING = false;

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    let _GGDBA;
    name !== undefined
      ? (_GGDBA = await GGDBA(TESTING, name))
      : (_GGDBA = await GGDBA(TESTING));
    if (!_GGDBA.length) {
      return res.status(404).send("CODE: 404, Not Found");
    }
    res.send(_GGDBA);
  } catch (e) {
    return PLE(e, __filename);
  }
});

router.post("/", async (req, res) => {
  try {
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
    const _GGDBA = await GGDBA(TESTING, name);
    res.send(_GGDBA);
  } catch (e) {
    return PLE(e, __filename);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let _GGDBABI = await GGDBABI(id);
    if (_GGDBABI !== false) return res.send(_GGDBABI);
    return res.status(404).send("CODE: 404, Not Found");
  } catch (e) {
    return PLE(e, __filename);
  }
});

module.exports = router;
