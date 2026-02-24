const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* ===========================
   MODELOS
=========================== */

db.Administrador = require("./administrador.model.js")(sequelize, Sequelize);
db.Profesor      = require("./profesor.model.js")(sequelize, Sequelize);
db.Alumno        = require("./alumno.model.js")(sequelize, Sequelize);
db.Test          = require("./test.model.js")(sequelize, Sequelize);
db.Pregunta      = require("./pregunta.model.js")(sequelize, Sequelize);
db.Resultado     = require("./resultado.model.js")(sequelize, Sequelize);

/* ===========================
   RELACIONES
=========================== */

/* 🔹 Administrador -> Test */
db.Administrador.hasMany(db.Test, {
  foreignKey: "id_admin",
  onDelete: "CASCADE"
});
db.Test.belongsTo(db.Administrador, {
  foreignKey: "id_admin"
});

/* 🔹 Test -> Pregunta */
db.Test.hasMany(db.Pregunta, {
  foreignKey: "id_test",
  onDelete: "CASCADE"
});
db.Pregunta.belongsTo(db.Test, {
  foreignKey: "id_test"
});

/* 🔹 Administrador -> Profesor */
db.Administrador.hasMany(db.Profesor, {
  foreignKey: "id_admin",
  onDelete: "CASCADE"
});
db.Profesor.belongsTo(db.Administrador, {
  foreignKey: "id_admin"
});

/* 🔹 Profesor -> Alumno */
db.Profesor.hasMany(db.Alumno, {
  foreignKey: "id_profesor",
  onDelete: "CASCADE"
});
db.Alumno.belongsTo(db.Profesor, {
  foreignKey: "id_profesor"
});

/* ===========================
   MANY TO MANY
   Alumno <-> Test
   Tabla intermedia: Resultado
=========================== */

db.Alumno.belongsToMany(db.Test, {
  through: db.Resultado,
  foreignKey: "id_alumno",
  otherKey: "id_test",
  onDelete: "CASCADE"
});

db.Test.belongsToMany(db.Alumno, {
  through: db.Resultado,
  foreignKey: "id_test",
  otherKey: "id_alumno",
  onDelete: "CASCADE"
});

/* 🔥 IMPORTANTE PARA PODER HACER INCLUDE DESDE RESULTADO */

db.Resultado.belongsTo(db.Alumno, {
  foreignKey: "id_alumno"
});

db.Resultado.belongsTo(db.Test, {
  foreignKey: "id_test"
});

module.exports = db;