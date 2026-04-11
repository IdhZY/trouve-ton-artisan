const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { rateLimit } = require("express-rate-limit");
const Artisan = require("../models/artisan");
const Categorie = require("../models/categorie");
const Specialite = require("../models/specialite");

/**
 * @param {string} str
 * @returns {string}
 */
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Limite requete contact pour éviter spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Trop de tentatives, réessayez dans 15 minutes." },
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// GET /api/artisans/categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Categorie.findAll({ order: [["nom", "ASC"]] });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /api/artisans/top/artisans
router.get("/top/artisans", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top_artisan: 1 },
      include: [{ model: Specialite }],
      limit: 3,
    });
    res.json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /api/artisans/recherche/:nom
router.get("/recherche/:nom", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { nom: { [Op.like]: "%" + req.params.nom + "%" } },
      include: [{ model: Specialite }],
    });
    res.json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /api/artisans/categorie/:id
router.get("/categorie/:id", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          where: { id_categorie: req.params.id },
        },
      ],
    });
    res.json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// POST /api/artisans/:id/contact
router.post("/:id/contact", contactLimiter, async (req, res) => {
  try {
    const { nom, email, objet, message } = req.body;

    if (!nom || !email || !objet || !message) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    const artisan = await Artisan.findByPk(String(req.params.id));
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé." });
    }

    await transporter.sendMail({
      from: '"Trouve ton Artisan" <' + process.env.MAIL_USER + ">",
      to: String(artisan.get("email")),
      subject: objet,
      html: `<p><strong>Message de :</strong> ${escapeHtml(nom)} (${escapeHtml(email)})</p>
       <p><strong>Objet :</strong> ${escapeHtml(objet)}</p>
       <hr/>
       <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });

    res.json({ success: true, message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /api/artisans/:id
router.get("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{ model: Specialite }],
    });
    if (!artisan)
      return res.status(404).json({ message: "Artisan non trouvé" });
    res.json(artisan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// GET /api/artisans
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [{ model: Specialite }],
    });
    res.json(artisans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
