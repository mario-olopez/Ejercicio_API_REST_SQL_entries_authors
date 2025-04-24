const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;

//Rutas
const authorRoutes = require("./routes/author.routes");
const entriesRoutes = require("./routes/entries.routes");

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hola mundo")
})

//Importar morgan
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'))

//Rutas
//Definimos el prefijo
app.use("/api/authors", authorRoutes)
app.use("/api/entries", entriesRoutes)

//Función para encender el servidor
app.listen(port, () => {
    console.log(`El puerto ${port} está corriendo`)
})