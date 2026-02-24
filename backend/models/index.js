const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Administrador = require("./administrador.model.js")(sequelize, Sequelize);
db.Test = require("./test.model.js")(sequelize, Sequelize);
db.Pregunta = require("./pregunta.model.js")(sequelize, Sequelize);
db.Profesor = require("./profesor.model.js")(sequelize, Sequelize);
db.Alumno = require("./alumno.model.js")(sequelize, Sequelize);
db.Resultado = require("./resultado.model.js")(sequelize, Sequelize);

/**
 * RELACIÓN ONE TO MANY
 * Administrador -> Test
 */
db.Administrador.hasMany(db.Test, {
  foreignKey: {
    name: 'id_admin',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.Test.belongsTo(db.Administrador, {
  foreignKey: {
    name: 'id_admin',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

/**
 * RELACIÓN ONE TO MANY
 * Test -> Preguntas
 */
db.Test.hasMany(db.Pregunta, {
  foreignKey: {
    name: 'id_test',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.Pregunta.belongsTo(db.Test, {
  foreignKey: {
    name: 'id_test',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

/**
 * RELACIÓN ONE TO MANY
 * Administrador -> Profesores
 */
db.Administrador.hasMany(db.Profesor, {
  foreignKey: {
    name: 'id_admin',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.Profesor.belongsTo(db.Administrador, {
  foreignKey: {
    name: 'id_admin',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

/**
 * RELACIÓN ONE TO MANY
 * Profesor -> Alumnos
 */
db.Profesor.hasMany(db.Alumno, {
  foreignKey: {
    name: 'id_profesor',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.Alumno.belongsTo(db.Profesor, {
  foreignKey: {
    name: 'id_profesor',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

/**
 * RELACIÓN MANY TO MANY
 * Alumno <-> Test
 */
db.Alumno.belongsToMany(db.Test, {
  through: db.Resultado,
  foreignKey: {
    name: 'id_alumno',
    allowNull: false
  },
  onDelete: 'CASCADE'
});

db.Test.belongsToMany(db.Alumno, {
  through: db.Resultado,
  foreignKey: {
    name: 'id_test',
    allowNull: false
  },
  onDelete: 'CASCADE',
  fecha: {
    type: 'DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL',
    allowNull: false,
    defaultValue: () => new Date()
  },
  nota: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 2.0
  },
}, {
  timestamps: false
});

module.exports = db;