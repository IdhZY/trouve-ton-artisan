-- ============================================================
-- Trouve ton Artisan - Script de création de la base de données
-- Région Auvergne-Rhône-Alpes
-- ============================================================
-- ------------------------------------------------------------
-- Table : categorie
-- Une spécialité est rattachée à une seule catégorie
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categorie (
    id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nom         VARCHAR(100)    NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ------------------------------------------------------------
-- Table : specialite
-- Un artisan appartient à une seule spécialité
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS specialite (
    id              INT UNSIGNED    NOT NULL AUTO_INCREMENT,
    nom             VARCHAR(100)    NOT NULL,
    id_categorie    INT UNSIGNED    NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (id_categorie)
        REFERENCES categorie (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ------------------------------------------------------------
-- Table : artisan
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artisan (
    id              INT UNSIGNED        NOT NULL AUTO_INCREMENT,
    nom             VARCHAR(150)        NOT NULL,
    note            DECIMAL(2,1)        NOT NULL    DEFAULT 0.0
                                        CHECK (note >= 0 AND note <= 5),
    ville           VARCHAR(100)        NOT NULL,
    a_propos        TEXT                NULL,
    email           VARCHAR(255)        NOT NULL,
    site_web        VARCHAR(255)        NULL,
    top_artisan     TINYINT(1)          NOT NULL    DEFAULT 0,
    id_specialite   INT UNSIGNED        NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (id_specialite)
        REFERENCES specialite (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
