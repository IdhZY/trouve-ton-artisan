const express = require("express");
const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");
const artisansRouter = require("./routes/artisan");
const apiKeyAuth = require("./middleware/auth");

// ─── Configuration ───────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Trop de requêtes, réessaye dans 15 minutes." },
});

// ─── Middlewares ──────────────────────────────────────────────────
app.use(limiter);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(apiKeyAuth);

// ─── Routes ───────────────────────────────────────────────────────
app.use("/api/artisans", artisansRouter);

// ─── Démarrage ────────────────────────────────────────────────────
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à la base de données réussie !");
    app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ BDD inaccessible, arrêt.", err.message);
    process.exit(1);
  });
