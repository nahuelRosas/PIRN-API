const { Router } = require("express");
const EH = require("../middlewares/errorHandler.middlewares.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGames = require("./videoGames.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videoGames);

router.get("/", (req, res) => {
  const payload = "NAHUEL ES EL MEJOR DEL UNIVERSO \n";
  res.send(payload.repeat(10000));
});

router.use(EH);

module.exports = router;
