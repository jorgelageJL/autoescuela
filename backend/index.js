const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let corsOptions = {
  origin: '*',
  // origin: 'http://localhost:8100',
  // credentials: true,
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir /public
app.use(express.static(path.join(__dirname, 'public')));

// CORS para /images
app.use('/images', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Servir la carpeta /images
app.use('/images', express.static(path.join(__dirname, 'images')));

const db = require("./models");
// normal use. Doesn't delete the database data
// db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to autoescuela application." });
});


require("./routes/administrador.routes.js")(app);
require("./routes/test.routes")(app);
require("./routes/pregunta.routes")(app);
require("./routes/profesor.routes")(app);
require("./routes/alumno.routes")(app);
require("./routes/resultado.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});