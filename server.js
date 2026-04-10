const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");
const artisansRouter = require("./routes/artisan");
const apiKeyAuth = require("./middleware/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Trop de requêtes, réessaye dans 15 minutes." }
});

const app = express();

app.use(limiter);
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(apiKeyAuth);

app.use("/api/artisans", artisansRouter);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ BDD inaccessible, arrêt.", err.message);
    process.exit(1);
  });
