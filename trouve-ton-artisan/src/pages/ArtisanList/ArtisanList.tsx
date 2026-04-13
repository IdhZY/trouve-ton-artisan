import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  fetchArtisansByCategorie,
  fetchCategories,
  searchArtisans,
} from "../../services/api";
import type { Artisan } from "../../types";
import "./ArtisanList.scss";

interface Categorie {
  id: number;
  nom: string;
}

function StarRating({ note }: { note: number }) {
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
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const isSearch = !slug && !!searchQuery;

  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [categorie, setCategorie] = useState<Categorie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCategorie(null);

    if (isSearch && searchQuery) {
      searchArtisans(searchQuery)
        .then((data) => setArtisans(data))
        .catch(() => setError("Impossible d'effectuer la recherche."))
        .finally(() => setLoading(false));
    } else if (slug) {
      fetchCategories()
        .then((cats) => {
          const cat = cats.find((c: Categorie) => c.id === parseInt(slug));
          setCategorie(cat || null);
        })
        .catch(() => {});

      fetchArtisansByCategorie(parseInt(slug))
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
              <h3 className="artisan-card__nom">{a.nom}</h3>
              <StarRating note={a.note} />
              <p className="artisan-card__specialite">
                {a.Specialite ? a.Specialite.nom : ""}
              </p>
              <p className="artisan-card__localisation">
                {a.ville}
                {a.code_postal ? ", " + a.code_postal : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtisanList;
