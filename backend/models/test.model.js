module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("test", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });

  return Test;
};