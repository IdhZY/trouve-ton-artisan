-- ============================================================
-- Trouve ton Artisan - Script d'alimentation (jeu d'essais)
-- Région Auvergne-Rhône-Alpes
-- ============================================================
-- ------------------------------------------------------------
-- Alimentation : categorie
-- ------------------------------------------------------------
INSERT INTO categorie (id, nom) VALUES
    (1, 'Alimentation'),
    (2, 'Bâtiment'),
    (3, 'Fabrication'),
    (4, 'Services');


-- ------------------------------------------------------------
-- Alimentation : specialite
-- ------------------------------------------------------------
INSERT INTO specialite (id, nom, id_categorie) VALUES
    -- Alimentation
    (1,  'Boucher',      1),
    (2,  'Boulanger',    1),
    (3,  'Chocolatier',  1),
    (4,  'Traiteur',     1),
    -- Bâtiment
    (5,  'Chauffagiste', 2),
    (6,  'Electricien',  2),
    (7,  'Menuisier',    2),
    (8,  'Plombier',     2),
    -- Fabrication
    (9,  'Bijoutier',    3),
    (10, 'Couturier',    3),
    (11, 'Ferronier',    3),
    -- Services
    (12, 'Coiffeur',     4),
    (13, 'Fleuriste',    4),
    (14, 'Toiletteur',   4),
    (15, 'Webdesign',    4);


-- ------------------------------------------------------------
-- Alimentation : artisan
-- ------------------------------------------------------------
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, top_artisan, id_specialite) VALUES
    -- Alimentation
    (
        'Boucherie Dumont', 4.5, 'Lyon',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'boucherie.dumond@gmail.com', NULL, 0, 1
    ),
    (
        'Au pain chaud', 4.8, 'Montélimar',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'aupainchaud@hotmail.com', NULL, 1, 2
    ),
    (
        'Chocolaterie Labbé', 4.9, 'Lyon',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1, 3
    ),
    (
        'Traiteur Truchon', 4.1, 'Lyon',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0, 4
    ),
    -- Bâtiment
    (
        'Orville Salmons', 5.0, 'Evian',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'o-salmons@live.com', NULL, 1, 5
    ),
    (
        'Mont Blanc Eléctricité', 4.5, 'Chamonix',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 0, 6
    ),
    (
        'Boutot & fils', 4.7, 'Bourg-en-bresse',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0, 7
    ),
    (
        'Vallis Bellemare', 4.0, 'Vienne',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0, 8
    ),
    -- Fabrication
    (
        'Claude Quinn', 4.2, 'Aix-les-bains',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'claude.quinn@gmail.com', NULL, 0, 9
    ),
    (
        'Amitee Lécuyer', 4.5, 'Annecy',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0, 10
    ),
    (
        'Ernest Carignan', 5.0, 'Le Puy-en-Velay',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'e-carigan@hotmail.com', NULL, 0, 11
    ),
    -- Services
    (
        'Royden Charbonneau', 3.8, 'Saint-Priest',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'r.charbonneau@gmail.com', NULL, 0, 12
    ),
    (
        'Leala Dennis', 3.8, 'Chambéry',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0, 12
    ),
    (
        'C''est sup''hair', 4.1, 'Romans-sur-Isère',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'sup-hair@gmail.com', 'https://sup-hair.fr', 0, 12
    ),
    (
        'Le monde des fleurs', 4.6, 'Annonay',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0, 13
    ),
    (
        'Valérie Laderoute', 4.5, 'Valence',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'v-laredoute@gmail.com', NULL, 0, 14
    ),
    (
        'CM Graphisme', 4.4, 'Valence',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.',
        'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0, 15
    );
