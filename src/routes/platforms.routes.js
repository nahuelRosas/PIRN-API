const { Router } = require("express");
const { IPDB } = require("../controllers/platforms.controllers");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let _IPDB = await IPDB();

    if (!_IPDB.length) {
      return res.status(404).send("CODE: 404, Not Found");
    }
    res.send(_IPDB);
  } catch (e) {
    return PLE(e, __filename);
  }
});

module.exports = router;
