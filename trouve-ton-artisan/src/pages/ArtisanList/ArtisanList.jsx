import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  fetchArtisansByCategorie,
  fetchCategories,
  searchArtisans,
} from "../../services/api";
import "./ArtisanList.scss";

// role="img" + aria-hidden sur les ★ pour éviter la lecture "étoile noire x5" par les screen readers
function StarRating({ note }) {
  return (
    <div className="stars" role="img" aria-label={"Note : " + note + " sur 5"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={
            i <= Math.round(note) ? "star star--full" : "star star--empty"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ArtisanList() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const isSearch = !slug && !!searchQuery;

  const [artisans, setArtisans] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCategorie(null);

    if (isSearch) {
      searchArtisans(searchQuery)
        .then((data) => setArtisans(data))
        .catch(() => setError("Impossible d'effectuer la recherche."))
        .finally(() => setLoading(false));
    } else {
      fetchCategories()
        .then((cats) => {
          const cat = cats.find((c) => c.id === parseInt(slug));
          setCategorie(cat || null);
        })
        .catch(() => {});

      fetchArtisansByCategorie(slug)
        .then((data) => setArtisans(data))
        .catch(() => setError("Impossible de charger les artisans."))
        .finally(() => setLoading(false));
    }
  }, [slug, isSearch, searchQuery]);

  const pageTitle = isSearch
    ? 'Résultats pour "' + searchQuery + '"'
    : categorie
      ? categorie.nom.toUpperCase()
      : "Chargement...";

  const breadcrumbLabel = isSearch
    ? "Recherche"
    : categorie
      ? categorie.nom
      : "Catégorie";

  // Titre dynamique de page (WCAG 2.4.2)
  useEffect(() => {
    if (isSearch && searchQuery) {
      document.title = 'Recherche "' + searchQuery + '" — Trouve ton Artisan';
    } else if (categorie) {
      document.title = categorie.nom + " — Trouve ton Artisan";
    } else {
      document.title = "Artisans — Trouve ton Artisan";
    }
  }, [isSearch, searchQuery, categorie]);

  return (
    <div className="artisan-list">
      <div className="artisan-list__container">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true"> → </span>
          <span aria-current="page">{breadcrumbLabel}</span>
        </nav>

        <h1 className="artisan-list__title">{pageTitle}</h1>

        {loading && <p className="artisan-list__loading">Chargement...</p>}
        {error && <p className="artisan-list__error">{error}</p>}

        <div className="artisan-list__grid">
          {artisans.map((a) => (
            <Link
              to={"/artisan/" + a.id}
              key={a.id}
              className="artisan-card"
              aria-label={"Voir la fiche de " + a.nom}
            >
              {/* h3 : h1 = titre page, h2 absent, noms d'artisans au niveau 3 */}
              <h3 className="artisan-card__nom">{a.nom}</h3>
              <StarRating note={a.note} />
              <p className="artisan-card__specialite">
                {a.Specialite ? a.Specialite.nom : ""}
              </p>
              <p className="artisan-card__localisation">
                {a.ville}{a.code_postal ? ", " + a.code_postal : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ArtisanList;
