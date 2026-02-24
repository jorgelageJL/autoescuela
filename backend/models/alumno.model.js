module.exports = (sequelize, Sequelize) => {

  const Alumno = sequelize.define("alumno", {
    id_alumno: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dni: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return Alumno;
};