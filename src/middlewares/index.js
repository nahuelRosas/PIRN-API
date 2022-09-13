const server = require("../configs/server.config");
const compression = require("compression");
const routes = require("../routes/index.js");

const { EH } = require("../middlewares/errorHandler.middlewares");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(
  compression({
    level: 9,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// server.use(cookieParser());
// server.use(morgan("dev"));

// server.use(EH);
server.use("/", routes);

module.exports = server;
