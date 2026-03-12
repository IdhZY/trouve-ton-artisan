const express = require("express");
const router = express.Router();
const { Artisan, Specialite, Categorie } = require("../models");

// GET - Tous les artisans
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          include: [Categorie],
        },
      ],
    });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// GET - Les 3 artisans du mois
router.get("/top/artisans", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top_artisan: 1 },
      include: [
        {
          model: Specialite,
          include: [Categorie],
        },
      ],
    });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// GET - Artisans par catégorie
router.get("/categorie/:id", async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          where: { id_categorie: req.params.id },
          include: [Categorie],
        },
      ],
    });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// GET - Recherche par nom
router.get("/recherche/:nom", async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const artisans = await Artisan.findAll({
      where: {
        nom: { [Op.like]: `%${req.params.nom}%` },
      },
      include: [
        {
          model: Specialite,
          include: [Categorie],
        },
      ],
    });
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

// GET - Un artisan par son id
router.get("/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [
        {
          model: Specialite,
          include: [Categorie],
        },
      ],
    });
    if (!artisan)
      return res.status(404).json({ message: "Artisan non trouvé" });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
});

module.exports = router;
