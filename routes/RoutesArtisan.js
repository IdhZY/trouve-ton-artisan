// @ts-nocheck
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Artisan = require("../models/artisan");
const Categorie = require("../models/categorie");
const Specialite = require("../models/specialite");
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
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
    res.status(500).json({ message: "Erreur serveur", error: error.message });
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
    res.status(500).json({ message: "Erreur serveur", error: error.message });
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
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// GET /api/artisans/recherche/:nom
router.get("/recherche/:nom", async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const artisans = await Artisan.findAll({
      where: { nom: { [Op.like]: "%" + req.params.nom + "%" } },
      include: [{ model: Specialite }],
    });
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// POST /api/artisans/:id/contact
router.post("/:id/contact", async (req, res) => {
  try {
    const { nom, email, objet, message } = req.body;

    if (!nom || !email || !objet || !message) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires." });
    }

    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé." });
    }

    await transporter.sendMail({
      from: '"Trouve ton Artisan" <' + process.env.MAIL_USER + ">",
      to: artisan.email,
      subject: objet,
      html:
        "<p><strong>Message de :</strong> " +
        nom +
        " (" +
        email +
        ")</p>" +
        "<p><strong>Objet :</strong> " +
        objet +
        "</p>" +
        "<hr/>" +
        "<p>" +
        message.replace(/\n/g, "<br>") +
        "</p>",
    });

    res.json({ success: true, message: "Email envoyé avec succès." });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi.", error: error.message });
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
    res.status(500).json({ message: "Erreur serveur", error: error.message });
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
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
