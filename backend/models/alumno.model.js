module.exports = (sequelize, Sequelize) => {
  const Alumno = sequelize.define("alumno", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dni: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fecha_alta: {
      type: 'DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL',
      allowNull: false,
      defaultValue: () => new Date()
    },
  }, {
    timestamps: false
  });

  return Alumno;
};