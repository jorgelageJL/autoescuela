require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8100"
};

const db = require("./models");

/* //Esto borra TODAS las tablas cada vez que arrancas el servidor
 db.sequelize.sync({ force: true }).then(() => {
   console.log("Se han eliminado y re-sincronizado las tablas.");
 });*/


//Uso normal (NO borra datos)
db.sequelize.sync().then(async () => {
  console.log("Base de datos sincronizada.");
  await createDefaultAdmin();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to autoescuela application."});
});

require("./routes/administrador.routes.js")(app);
require("./routes/test.routes")(app);
require("./routes/pregunta.routes")(app);
require("./routes/profesor.routes")(app);
require("./routes/alumno.routes")(app);
require("./routes/resultado.routes")(app);
require("./routes/auth.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// 🔐 Crear admin por defecto si no existe
async function createDefaultAdmin() {
  const adminCount = await db.Administrador.count();

  if (adminCount === 0) {
    await db.Administrador.create({
      nombre: "Super",
      apellidos: "Admin",
      dni: "00000000A",
      email: "admin@admin.com",
      password: bcrypt.hashSync("admin123", 10)
    });

    console.log("Admin por defecto creado");
  }
}