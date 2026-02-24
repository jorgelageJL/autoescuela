module.exports = (sequelize, Sequelize) => {
  const Resultado = sequelize.define("resultado", {

    id_alumno: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },

    id_test: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },

    nota: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },

    fecha: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }

  }, {
    timestamps: false
  });

  return Resultado;
};