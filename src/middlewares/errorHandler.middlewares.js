const { PLE } = require("../utils/processLog.utils");

const EH = (err, req, res, next) => {
  // EH => Error Handler
  const status = err.status || 500;
  const message = err.message || err;

  PLE(`${message} --- Status:${status}`, __filename, "error");

  res.status(status).send(message);
};

module.exports = { EH };
