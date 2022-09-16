const { PLE } = require("../utils/processLog.utils");

const EH = (req, res, next) => {
  // EH => Error Handler
  const message = `This page does not exist, from PIRN we apologize`;
  const status = 500;
  PLE(`${message} --- Status:${status} `, __filename, "error");
  res.status(status).send(message);
};

module.exports = EH;
