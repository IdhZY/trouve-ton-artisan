const sequelize = require("./config/database");

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion :", err);
  });
