const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Specialite = sequelize.define(
  "Specialite",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    id_categorie: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "specialite",
    timestamps: false,
  },
);

module.exports = Specialite;
