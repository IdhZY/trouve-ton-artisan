const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./models");
const artisansRouter = require("./routes/RoutesArtisan");
const apiKeyAuth = require("./middleware/auth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(apiKeyAuth);

// Routes
app.use("/api/artisans", artisansRouter);

const PORT = process.env.PORT || 3000;

console.log("🔄 Tentative de connexion...");

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie !");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion :", err.message);
  });
