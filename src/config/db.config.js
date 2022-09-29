require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;
const { PLE } = require("../utils/processLog.utils");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  // logging: (...msg) => console.log(msg),
  logging: false,
  native: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    let message =
      "The connection to the database has been successfully established";
    PLE(message, __filename);
  } catch (e) {
    return PLE(e, __filename, "error");
  }
})();

module.exports = { conn: sequelize };
