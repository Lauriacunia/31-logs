import winston from "winston";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

/**con winston no creo categorias sino loggers por separado */
function loggerProd() {
  return winston.createLogger({
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });
}

function loggerDev() {
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });
}

let logger = null;
if (process.env.NODE_ENV === "PROD") {
  logger = loggerProd();
  logger.info("logger iniciado en producción");
} else {
  logger = loggerDev();
  logger.info("logger iniciado en desarrollo");
}

export default logger;
