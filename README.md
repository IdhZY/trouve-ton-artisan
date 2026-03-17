# Trouve ton Artisan 🔨

Plateforme dédiée aux artisans de la région Auvergne-Rhône-Alpes, permettant aux particuliers de trouver un artisan et de le contacter facilement.

---

## 📋 Prérequis

- Node.js v18+
- MySQL 8+
- npm v9+

---

## ⚙️ Installation et lancement

### 1. Cloner le projet

```bash
git clone https://github.com/ton-username/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données

Importe les scripts SQL dans MySQL :

```bash
mysql -u root -p < database/create.sql
mysql -u root -p < database/seed.sql
```

### 3. Backend

```bash
npm install
cp .env.example .env
npm run dev
```

Le backend tourne sur **http://localhost:3000**

### 4. Frontend

```bash
cd trouve-ton-artisan
npm install
cp .env.example .env
npm run dev
```

Le frontend tourne sur **http://localhost:5173**

---

## 🔑 Variables d'environnement

### Backend (.env)

| Variable      | Description                | Exemple              |
| ------------- | -------------------------- | -------------------- |
| `DB_HOST`     | Hôte MySQL                 | `localhost`          |
| `DB_PORT`     | Port MySQL                 | `3306`               |
| `DB_NAME`     | Nom de la base             | `trouve_ton_artisan` |
| `DB_USER`     | Utilisateur MySQL          | `root`               |
| `DB_PASSWORD` | Mot de passe MySQL         | `password`           |
| `PORT`        | Port du serveur            | `3000`               |
| `API_KEY`     | Clé d'authentification API | `tta_xxx`            |
| `MAIL_HOST`   | Serveur SMTP               | `smtp.gmail.com`     |
| `MAIL_PORT`   | Port SMTP                  | `587`                |
| `MAIL_USER`   | Email expéditeur           | `email@gmail.com`    |
| `MAIL_PASS`   | Mot de passe application   | `xxxxxxxxxxxx`       |

### Frontend (.env)

| Variable       | Description            | Exemple                     |
| -------------- | ---------------------- | --------------------------- |
| `VITE_API_URL` | URL de l'API           | `http://localhost:3000/api` |
| `VITE_API_KEY` | Clé d'authentification | `tta_xxx`                   |

---

## 🛠️ Technologies utilisées

**Frontend** : React 18, React Router v6, Bootstrap, Sass

**Backend** : Node.js, Express, Sequelize, MySQL, Nodemailer

---

## 📄 Routes API

Toutes les routes nécessitent le header `x-api-key`.

| Méthode | Route                          | Description                  |
| ------- | ------------------------------ | ---------------------------- |
| GET     | `/api/artisans`                | Tous les artisans            |
| GET     | `/api/artisans/top/artisans`   | Artisans du mois             |
| GET     | `/api/artisans/categories`     | Toutes les catégories        |
| GET     | `/api/artisans/categorie/:id`  | Artisans par catégorie       |
| GET     | `/api/artisans/recherche/:nom` | Recherche par nom            |
| GET     | `/api/artisans/:id`            | Fiche d'un artisan           |
| POST    | `/api/artisans/:id/contact`    | Envoyer un email à l'artisan |
