module.exports = (sequelize, Sequelize) => {
  const Resultado = sequelize.define("resultado_test", {
    fecha: {
      type: timestamps,
      allowNull: false,
    },
    nota: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return Resultado;
};