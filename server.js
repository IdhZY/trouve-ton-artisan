const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");
const artisansRouter = require("./routes/RoutesArtisan");
const apiKeyAuth = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use(apiKeyAuth);

app.use("/api/artisans", artisansRouter);

const PORT = process.env.PORT || 3000;

// Démarrer le serveur immédiatement
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});

// Vérifier la connexion BDD après
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie !");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion :", err.message);
  });
