const colors = require("colors");
const path = require("path");
require("dotenv").config();
const fs = require("fs");
colors.enable();

const { TEMP_DIR } = process.env;

const log = {
  error: (e) => console.log(colors.bgRed(e).bold),
  log: (e) => console.log(colors.bgMagenta(e).bold),
  success: (e) => console.log(colors.bgGreen(e).bold),
  warning: (e) => console.log(colors.bgYellow(e).bold),
  rainbow: (e) => console.log(colors.rainbow(e).bold),
};

const PLE = async (
  Log = "Function PLE ---> (LOG,FILENAME,CONTEXT,RESTART,,DIR)",
  fileName = __filename,
  Context = "log",
  Restart = false,
  Dir
) => {
  // Process Log Executor ==> Syntax for correct use: throw new Error(`Function GIA  ${__dirname}`);
  const timestamp = Date.now();
  const humanReadableDateTime = new Date(timestamp).toLocaleString();
  const messageBase = `${humanReadableDateTime} ---- `;

  let dir = Dir || TEMP_DIR;

  const _basename = path.basename(fileName);

  let _Log = typeof Log === "Object" ? Log.toString() : Log;

  let message =
    Context == "log" || Context == "rainbow"
      ? `\n${messageBase}${_basename} ---- ${_Log}`
      : Context == "error"
      ? `\n${messageBase}${_basename} ---- ERROR: ${_Log}`
      : Context == "success"
      ? `\n${messageBase}${_basename} ---- SUCCESS: ${_Log}`
      : `\n${messageBase}${_basename} ---- WARNING: ${_Log}`;

  let CB = (err) => {
    if (err) {
      log.error(`${messageBase}Error in PLE: ${err}`);
      return PLE(err);
    }

    Context == "log"
      ? log.log(`${message}`)
      : Context == "rainbow"
      ? log.rainbow(`${message}`)
      : Context == "warning"
      ? log.warning(`${message}`)
      : Context == "error"
      ? log.error(
          `\n${message} \n${humanReadableDateTime} ---- The log has been modified => ${TEMP_DIR}`
        )
      : Context == "success"
      ? log.success(`${message}`)
      : null;
  };

  Restart ? fs.writeFile(dir, message, CB) : fs.appendFile(dir, message, CB);
  return false;
};

//PLE();

module.exports = { PLE };
