# Trouve ton Artisan 🔨

Plateforme web permettant aux particuliers de la région **Auvergne-Rhône-Alpes** de trouver un artisan par catégorie, spécialité ou nom, de consulter sa fiche et de le contacter directement par email.

> **Stack** : Node.js · Express · Sequelize · MySQL · Nodemailer  
> **Front-end** : [trouve-ton-artisan-client](#) _(React 18 · React Router v6 · Bootstrap · Sass)_

---

## Architecture

```
trouve-ton-artisan/        ← Back-end (ce repo)
│
├── config/                ← Connexion base de données
├── middleware/            ← Authentification par clé API
├── models/                ← Modèles Sequelize (Artisan, Categorie, Specialite)
├── routes/                ← Endpoints REST
├── server.js              ← Point d'entrée
├── 01_create_database.sql ← Script de création BDD
└── 02_seed_database.sql   ← Script de données initiales
```

---

## Prérequis

- Node.js v18+
- MySQL 8+
- npm v9+

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données

```bash
mysql -u root -p < 01_create_database.sql
mysql -u root -p < 02_seed_database.sql
```

### 3. Variables d'environnement

```bash
cp .env.example .env
```

Renseigne les valeurs dans `.env` :

| Variable          | Description              | Exemple                 |
| ----------------- | ------------------------ | ----------------------- |
| `DB_HOST`         | Hôte MySQL               | `localhost`             |
| `DB_PORT`         | Port MySQL               | `3306`                  |
| `DB_NAME`         | Nom de la base           | `trouve_ton_artisan`    |
| `DB_USER`         | Utilisateur MySQL        | `root`                  |
| `DB_PASSWORD`     | Mot de passe MySQL       | `password`              |
| `PORT`            | Port du serveur          | `3000`                  |
| `API_KEY`         | Clé d'auth API           | `tta_xxxxx`             |
| `MAIL_HOST`       | Serveur SMTP             | `smtp.gmail.com`        |
| `MAIL_PORT`       | Port SMTP                | `587`                   |
| `MAIL_USER`       | Email expéditeur         | `email@gmail.com`       |
| `MAIL_PASS`       | Mot de passe application | `xxxxxxxxxxxx`          |
| `ALLOWED_ORIGINS` | Origines CORS autorisées | `http://localhost:5173` |

### 4. Lancer le serveur

```bash
npm install
npm run dev     # développement (nodemon)
npm start       # production
```

Le serveur tourne sur **http://localhost:3000**

---

## URL de production

https://trouve-ton-artisan-1-51zq.onrender.com

## API

Toutes les routes nécessitent le header suivant :

```
x-api-key: <votre_clé>
```

| Méthode | Route                          | Description                    |
| ------- | ------------------------------ | ------------------------------ |
| GET     | `/api/artisans`                | Liste de tous les artisans     |
| GET     | `/api/artisans/categories`     | Liste des catégories           |
| GET     | `/api/artisans/top/artisans`   | Top 3 artisans mis en avant    |
| GET     | `/api/artisans/categorie/:id`  | Artisans filtrés par catégorie |
| GET     | `/api/artisans/recherche/:nom` | Recherche par nom              |
| GET     | `/api/artisans/:id`            | Fiche détaillée d'un artisan   |
| POST    | `/api/artisans/:id/contact`    | Envoyer un email à un artisan  |

### Exemple de requête

```bash
curl -H "x-api-key: tta_xxxxx" http://localhost:3000/api/artisans/categories
```

### Exemple de réponse

```json
[
  { "id": 1, "nom": "Maçonnerie" },
  { "id": 2, "nom": "Plomberie" }
]
```

---

## Sécurité

- Authentification par clé API sur toutes les routes
- Rate limiting global (100 req / 15 min)
- Rate limiting renforcé sur le formulaire de contact (5 req / 15 min)
- Échappement HTML sur les données utilisateur (protection XSS)
- Variables sensibles isolées dans `.env` (non versionné)

---

## Auteur

**Florent Vidal** — [GitHub](https://github.com/ton-username)
