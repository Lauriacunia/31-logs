import express from "express";
import compression from "compression";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let saludo = "hola que tal".repeat(1000);

app.get("/saludo", (req, res) => {
  res.send(saludo);
});

/** usamos el middleware gzip solo en ésta ruta.
 * Podríamos usarlo en todas las rutas con el app.use(compression())
 */
app.get("/saludozip", compression(), (req, res) => {
  res.send(saludo);
});
/** ver los sizes de ambas rutas en el navegador al inspeccionar, en pestaña network */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));
