module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("test", {
    id_test: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    id_admin: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false
  });

  return Test;
};