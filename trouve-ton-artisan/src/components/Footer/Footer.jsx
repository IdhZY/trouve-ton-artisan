import { Link } from 'react-router-dom';
import './Footer.scss';

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo-link" aria-label="Accueil">
            <span className="site-footer__logo-title">Trouve ton artisan !</span>
            <span className="site-footer__logo-subtitle">Avec la région Auvergne-Rhône-Alpes</span>
          </Link>
          <address className="site-footer__address">
            101 cours Charlemagne<br />
            CS 20033 — 69269 LYON CEDEX 02<br />
            France — <a href="tel:+33426734000" className="site-footer__tel">+33 (0)4 26 73 40 00</a>
          </address>
        </div>
        <nav className="site-footer__nav" aria-label="Liens légaux">
          <ul className="site-footer__nav-list" role="list">
            <li><Link to="/mentions-legales" className="site-footer__nav-link">Mentions légales</Link></li>
            <li><Link to="/donnees-personnelles" className="site-footer__nav-link">Données personnelles</Link></li>
            <li><Link to="/accessibilite" className="site-footer__nav-link">Accessibilité</Link></li>
            <li><Link to="/cookies" className="site-footer__nav-link">Cookies</Link></li>
          </ul>
        </nav>
      </div>
      <hr className="site-footer__divider" />
      <p className="site-footer__copyright">
        <small>© {new Date().getFullYear()} Région Auvergne-Rhône-Alpes</small>
      </p>
    </footer>
  );
}

export default Footer;
