import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Legal.scss";

const pages = {
  "mentions-legales": "Mentions légales",
  "donnees-personnelles": "Données personnelles",
  accessibilite: "Accessibilité",
  cookies: "Cookies",
};

function Legal({ page }) {
  const titre = pages[page] || "Page légale";

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
