const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Artisan = sequelize.define(
  "Artisan",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    note: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 0.0,
    },
    ville: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code_postal: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    a_propos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    site_web: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    top_artisan: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    id_specialite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },

  {
    tableName: "artisan",
    timestamps: false,
  },
);

module.exports = Artisan;
