import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArtisan, sendContactForm } from "../../services/api";
import "./ArtisanDetail.scss";

function StarRating({ note }) {
  return (
    <div className="stars" aria-label={"Note : " + note + " sur 5"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
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

function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchArtisan(id)
      .then((data) => setArtisan(data))
      .catch(() => setError("Artisan introuvable."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus(null);
    try {
      await sendContactForm(id, form);
      setFormStatus("success");
      setForm({ nom: "", email: "", objet: "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading)
    return <div className="artisan-detail__loading">Chargement...</div>;
  if (error) return <div className="artisan-detail__error">{error}</div>;
  if (!artisan) return null;

  return (
    <div className="artisan-detail">
      <div className="artisan-detail__container">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span aria-hidden="true"> → </span>
          <Link
            to={
              "/categorie/" +
              (artisan.Specialite ? artisan.Specialite.id_categorie : "")
            }
          >
            {artisan.Specialite ? artisan.Specialite.nom : "Catégorie"}
          </Link>
          <span aria-hidden="true"> → </span>
          <span aria-current="page">{artisan.nom}</span>
        </nav>

        {/* Card identité */}
        <div className="artisan-detail__identity">
          <div
            className="artisan-detail__photo"
            aria-label="Photo de l'artisan"
          >
            <div
              className="artisan-detail__photo-placeholder"
              aria-hidden="true"
            />
          </div>
          <div className="artisan-detail__info">
            <h1 className="artisan-detail__nom">{artisan.nom}</h1>
            <StarRating note={artisan.note} />
            <p className="artisan-detail__specialite">
              {artisan.Specialite ? artisan.Specialite.nom : ""}
            </p>
            <p className="artisan-detail__ville">
              {artisan.ville}, {artisan.code_postal}
            </p>
            {artisan.site_web && (
              <a
                href={artisan.site_web}
                className="artisan-detail__site"
                target="_blank"
                rel="noopener noreferrer"
              >
                {artisan.site_web}
              </a>
            )}
          </div>
        </div>

        {/* Card à propos + contact */}
        <div className="artisan-detail__bottom">
          <div className="artisan-detail__apropos">
            <h2 className="artisan-detail__apropos-titre">À propos</h2>
            <p className="artisan-detail__apropos-texte">
              {artisan.a_propos || "Aucune description disponible."}
            </p>
          </div>

          <div className="artisan-detail__divider" aria-hidden="true" />

          <div className="artisan-detail__contact">
            <h2 className="artisan-detail__contact-titre">Nous contacter</h2>
            <form
              className="artisan-detail__form"
              onSubmit={handleSubmit}
              aria-label="Formulaire de contact"
            >
              <div className="artisan-detail__form-row">
                <input
                  type="text"
                  name="nom"
                  className="artisan-detail__input"
                  placeholder="Votre nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  aria-label="Votre nom"
                />
                <input
                  type="email"
                  name="email"
                  className="artisan-detail__input"
                  placeholder="Votre Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-label="Votre email"
                />
              </div>
              <input
                type="text"
                name="objet"
                className="artisan-detail__input"
                placeholder="Objet"
                value={form.objet}
                onChange={handleChange}
                required
                aria-label="Objet du message"
              />
              <textarea
                name="message"
                className="artisan-detail__textarea"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                aria-label="Votre message"
              />
              {formStatus === "success" && (
                <p className="artisan-detail__form-success">
                  Message envoyé avec succès !
                </p>
              )}
              {formStatus === "error" && (
                <p className="artisan-detail__form-error">
                  Une erreur est survenue. Réessayez.
                </p>
              )}
              <button
                type="submit"
                className="artisan-detail__btn"
                disabled={formLoading}
              >
                {formLoading ? "Envoi..." : "Envoyer"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtisanDetail;
