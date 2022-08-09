import express from "express";
import log4js from "log4js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

log4js.configure({
  appenders: {
    logsConsola: { type: "console" },
    logsInfoFile: { type: "file", filename: "logs/logsInfo .log" },
    logsErrorFile: { type: "file", filename: "logs/logsError.log" },
  },
  categories: {
    default: { appenders: ["logsConsola"], level: "all" },
    console: { appenders: ["logsConsola"], level: "all" },
    archivo: { appenders: ["logsInfoFile"], level: "info" },
    error: { appenders: ["logsErrorFile"], level: "error" },
  },
});

/** Levels: Trace, Debug, Info, Warn, Error, Fatal.
 *  Es una "clasificacion" de los tipos de mensajes que se quieren registrar,
 *  para que pueda filtrarlos y ver solo algun tipo de mensaje.
 *  Pej: solo quiero ver los logs de error (en general los mas urgentes de resolver).
 */
/**Instancio el logger y le digo que categoria va a mirar */
const logPrueba = log4js.getLogger("console");

app.use("/logs-por-consola", (req, res, next) => {
  logPrueba.info("Soy un log info de prueba");
  logPrueba.error("Soy un log error de prueba");
  logPrueba.warn("Soy un log warn de prueba");
  res.send("🔽✨ Mirá los logs en la consola 🔽✨");
});
app.use("/logs-en-archivo", (req, res, next) => {
  log4js.getLogger("archivo").info("Soy un log info de prueba");
  log4js.getLogger("archivo").error("Soy un log error de prueba");
  log4js.getLogger("archivo").warn("Soy un log warn de prueba");
  res.send("🔽✨ Mirá los logs en el archivo 🔽✨");
});

/**Desafío */
let logger = null;
if (process.env.NODE_ENV === "PROD") {
  logger = log4js.getLogger("error");
} else {
  logger = log4js.getLogger("default");
}

app.use("/sumar", (req, res, next) => {
  const { num1, num2 } = req.query;
  if (!isNaN(num1) || !isNaN(num2)) {
    logger.info(
      `Suma de ${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)}`
    );
    res.send(`Suma de ${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)}`);
  } else {
    logger.error(`Los parámetros ingresados no son correctos`);
    res.send(`Los parámetros ingresados no son correctos`);
  }
});

app.get("*", (req, res) => {
  logger.info(`Página no encontrada: ${req.originalUrl}`);
  res.send("🔽✨ Mirá los logs por default 🔽✨");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));
