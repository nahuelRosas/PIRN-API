const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/crash", (req, res) => {
  throw new Error("Sync error");
});
router.get("/", (req, res) => {
  const payload = "NAHUEL ES EL MEJOR DEL UNIVERSO \n";
  res.send(payload.repeat(10000));
});

module.exports = router;
