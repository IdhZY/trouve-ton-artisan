const sequelize = require("../config/database");
const Categorie = require("./categorie");
const Specialite = require("./specialite");
const Artisan = require("./artisan");

// Une catégorie a plusieurs spécialités
Categorie.hasMany(Specialite, { foreignKey: "id_categorie" });
Specialite.belongsTo(Categorie, { foreignKey: "id_categorie" });

// Une spécialité a plusieurs artisans
Specialite.hasMany(Artisan, { foreignKey: "id_specialite" });
Artisan.belongsTo(Specialite, { foreignKey: "id_specialite" });

module.exports = { sequelize, Categorie, Specialite, Artisan };
