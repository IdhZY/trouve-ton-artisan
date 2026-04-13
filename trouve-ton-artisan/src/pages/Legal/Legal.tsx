import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Legal.scss";

type PageKey = "mentions-legales" | "donnees-personnelles" | "accessibilite" | "cookies";

const pages: Record<PageKey, string> = {
  "mentions-legales": "Mentions légales",
  "donnees-personnelles": "Données personnelles",
  accessibilite: "Accessibilité",
  cookies: "Cookies",
};

function Legal({ page }: { page: PageKey }) {
  const titre = pages[page] || "Page légale";

  useEffect(() => {
    document.title = titre + " — Trouve ton Artisan";
  }, [titre]);

  return (
    <div className="legal">
      <div className="legal__container">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true"> → </span>
          <span aria-current="page">{titre}</span>
        </nav>
        <h1 className="legal__title">{titre}</h1>
        <div className="legal__content">
          <p className="legal__placeholder">Page en construction.</p>
        </div>
      </div>
    </div>
  );
}

export default Legal;