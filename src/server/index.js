const fs = require("fs");
const https = require("https");
const path = require("path");
const server = require("../middlewares/index");

require("dotenv").config();
const { EX_PROTOCOL } = process.env;
let serverProtocol;
if (EX_PROTOCOL === "https") {
  serverProtocol = https.createServer(
    {
      key: fs.readFileSync(
        path.join(__dirname, "..", "..", "private", "key.pem")
      ),
      cert: fs.readFileSync(
        path.join(__dirname, "..", "..", "private", "cert.pem")
      ),
    },
    server
  );
} else {
  serverProtocol = server;
}
module.exports = serverProtocol;
