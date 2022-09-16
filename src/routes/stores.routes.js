const { Router } = require("express");
const { ISDB } = require("../controllers/stores.controllers");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let _ISDB = await ISDB();

    if (!_ISDB.length) {
      return res.status(404).send("CODE: 404, Not Found");
    }
    res.send(_ISDB);
  } catch (e) {
    return PLE(e, __filename);
  }
});

module.exports = router;
