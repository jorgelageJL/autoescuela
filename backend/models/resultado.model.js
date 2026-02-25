module.exports = (sequelize, Sequelize) => {
  const Resultado = sequelize.define("resultado", {
    id_test: {
      // type: DataTypes.INTEGER,
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_alumno: {
      // type: DataTypes.INTEGER,
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    fecha: {
      // type: 'DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL',
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: () => new Date()
    },
    nota: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return Resultado;
};