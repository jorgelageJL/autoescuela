module.exports = (sequelize, Sequelize) => {
  const Test = sequelize.define("test", {
    id_test: {
      // type: DataTypes.INTEGER,
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
  }, {
    timestamps: false
  });

  return Test;
};