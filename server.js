const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");
const artisansRouter = require("./routes/RoutesArtisan");
const apiKeyAuth = require("./middleware/auth");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://trouve-ton-artisan-liart.vercel.app",
      "https://my-project-pi-neon.vercel.app",
    ],
  }),
);
app.use(express.json());
app.use(apiKeyAuth);

app.use("/api/artisans", artisansRouter);

const PORT = process.env.PORT || 3000;

// Démarrer le serveur immédiatement
app.listen(PORT, () => {
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
