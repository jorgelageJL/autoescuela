module.exports = (sequelize, Sequelize) => {

  const Profesor = sequelize.define("profesor", {
    id_profesor: {
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

  return Profesor;
};