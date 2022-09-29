const server = require("../config/server.config");
const compression = require("compression");
const routes = require("../routes/index.js");
const { PLE } = require("../utils/processLog.utils");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const EH = require("./errorHandler.middlewares");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000" || "http://192.168.1.70:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const morganOptions = (tokens, req, res) => {
  let status = tokens.status(req, res);
  let response = `
  Remote Addr: ${tokens["remote-addr"](req, res)}
  Remote User: ${tokens["remote-user"](req, res)}
  Method: ${tokens.method(req, res)}
  URL: ${tokens.url(req, res)}
  HTTP Version: ${tokens["http-version"](req, res)}
  Status: ${status}
  Response Time: ${tokens["response-time"](req, res)}ms
  User-Agent:${tokens["user-agent"](req, res)}`;
  status >= 400
    ? PLE(response, "MORGAN - Middleware", "error")
    : PLE(response, "MORGAN - Middleware");
};

server.use(compression());
server.use(cors(corsOptions));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(helmet());
server.use(cookieParser());
server.use(morgan(morganOptions));
server.use("/", routes);
server.use(EH);

module.exports = server;
