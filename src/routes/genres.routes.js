const { Router } = require("express");
const { IGDB } = require("../controllers/genres.controllers");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let _IGDB = await IGDB();

    if (!_IGDB.length) {
      return res.status(404).send("CODE: 404, Not Found");
    }
    res.send(_IGDB);
  } catch (e) {
    return PLE(e, __filename);
  }
});

module.exports = router;
