/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
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
