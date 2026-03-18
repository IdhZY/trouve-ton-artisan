import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchArtisansDuMois } from "../../services/api";
import "./Home.scss";

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

function Home() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Accueil — Trouve ton Artisan";
  }, []);

  useEffect(() => {
    fetchArtisansDuMois()
      .then((data) => setArtisans(data))
      .catch(() => setError("Impossible de charger les artisans du mois."))
      .finally(() => setLoading(false));
  }, []);

  const etapes = [
    { num: 1, texte: "Choisir la catégorie d'artisanat dans le menu" },
    { num: 2, texte: "Parcourez et choisissez un artisan de votre choix" },
    { num: 3, texte: "Contactez l'artisan via le formulaire de contact" },
    { num: 4, texte: "Recevez une réponse sous 48h au maximum" },
  ];

  return (
    <div className="home">
      <div className="home__container">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true"> → </span>
          <span aria-current="page">Trouver un artisan</span>
        </nav>

        <h1 className="home__title">Trouve ton artisan !</h1>

        <section className="home__etapes" aria-labelledby="etapes-titre">
          <h2 className="home__etapes-titre" id="etapes-titre">
            Comment trouver mon artisan ?
          </h2>
          <div className="home__etapes-grid">
            {etapes.map((e) => (
              <div key={e.num} className="home__etape-card">
                <h3 className="home__etape-num">Étape {e.num}</h3>
                <p className="home__etape-texte">{e.texte}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home__artisans" aria-labelledby="artisans-titre">
          <h2 className="home__artisans-titre" id="artisans-titre">
            Les artisans du mois
          </h2>
          {loading && <p className="home__loading">Chargement...</p>}
          {error && <p className="home__error">{error}</p>}
          <div className="home__artisans-grid">
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
                  {a.ville}{a.code_postal ? ", " + a.code_postal : ""}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
