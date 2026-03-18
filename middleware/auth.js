require("dotenv").config();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "Clé API manquante" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Clé API invalide" });
  }

  next();
};

module.exports = apiKeyAuth;
