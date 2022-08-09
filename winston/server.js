import express from "express";
import logger from "./logger.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Desafío */

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
