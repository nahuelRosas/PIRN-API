const express = require("express");

require("./db.config.js");
const server = express();

server.name = "PIRN";

module.exports = server;
