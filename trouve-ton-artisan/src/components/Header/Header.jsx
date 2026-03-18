import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories, searchArtisans } from "../../services/api";
import "./Header.scss";

function Header() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const searchWrapperRef = useRef(null);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erreur catégories :", err));
  }, []);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchArtisans(value.trim());
        setSearchResults(results);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate("/recherche?q=" + encodeURIComponent(searchQuery.trim()));
      setMenuOpen(false);
    }
  };

  const handleResultClick = (id) => {
    setShowDropdown(false);
    setSearchQuery("");
    navigate("/artisan/" + id);
    setMenuOpen(false);
  };

  return (
    <header className="site-header" role="banner">
      <div className="site-header__top">
        <Link
          to="/"
          className="site-header__logo"
          aria-label="Trouve ton artisan - Accueil"
        >
          <span className="site-header__logo-title">Trouve ton artisan !</span>
          <span className="site-header__logo-subtitle">
            Avec la région Auvergne-Rhône-Alpes
          </span>
        </Link>

        {/* Nav inline sur desktop */}
        <nav
          className={
            "site-header__nav" + (menuOpen ? " site-header__nav--open" : "")
          }
          aria-label="Navigation principale"
        >
          <ul className="site-header__nav-list" role="list">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={"/categorie/" + cat.id}
                  className="site-header__nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search desktop */}
        <div className="site-header__search-wrapper" ref={searchWrapperRef}>
          <form
            className="site-header__search"
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <input
              type="search"
              className="site-header__search-input"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Rechercher un artisan"
              autoComplete="off"
            />
            <button
              type="submit"
              className="site-header__search-btn"
              aria-label="Lancer la recherche"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
          {showDropdown && (
            <ul className="site-header__search-dropdown" role="listbox">
              {searchResults.length === 0 && (
                <li className="site-header__search-item">
                  Aucun artisan trouvé
                </li>
              )}
              {searchResults.map((a) => (
                <li key={a.id} role="option">
                  <button
                    className="site-header__search-result"
                    onClick={() => handleResultClick(a.id)}
                  >
                    <span className="site-header__search-result-name">
                      {a.nom}
                    </span>
                    <span className="site-header__search-result-meta">
                      {a.Specialite ? a.Specialite.nom : ""} — {a.ville}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          className={
            "site-header__burger" +
            (menuOpen ? " site-header__burger--open" : "")
          }
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <span className="site-header__burger-bar" />
          <span className="site-header__burger-bar" />
          <span className="site-header__burger-bar" />
        </button>
      </div>
    </header>
  );
}
export default Header;
