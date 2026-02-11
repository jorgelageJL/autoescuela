module.exports = (sequelize, Sequelize) => {
  const Pregunta = sequelize.define("pregunta", {
    id_pregunta: {
      // type: DataTypes.INTEGER,
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    enunciado: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    opcion_a: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    opcion_b: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    opcion_c: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    respuesta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tema: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return Pregunta;
};