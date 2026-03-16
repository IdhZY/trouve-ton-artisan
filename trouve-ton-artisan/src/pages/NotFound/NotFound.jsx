import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__illustration" aria-hidden="true">
          <svg
            viewBox="0 0 400 300"
            xmlns="http://www.w3.org/2000/svg"
            className="not-found__svg"
          >
            <ellipse cx="200" cy="250" rx="180" ry="40" fill="#e8f4fd" />
            <rect
              x="120"
              y="80"
              width="160"
              height="140"
              rx="8"
              fill="#f4a58a"
              opacity="0.6"
            />
            <line
              x1="120"
              y1="80"
              x2="200"
              y2="30"
              stroke="#f4a58a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="280"
              y1="80"
              x2="200"
              y2="30"
              stroke="#f4a58a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="120"
              y1="80"
              x2="120"
              y2="220"
              stroke="#f4a58a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="280"
              y1="80"
              x2="280"
              y2="220"
              stroke="#f4a58a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <line
              x1="120"
              y1="220"
              x2="280"
              y2="220"
              stroke="#f4a58a"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="150" cy="240" r="18" fill="#7b9fd4" opacity="0.7" />
            <circle cx="250" cy="240" r="18" fill="#7b9fd4" opacity="0.7" />
            <circle cx="310" cy="160" r="30" fill="#c8d8f0" opacity="0.5" />
            <circle cx="330" cy="130" r="20" fill="#c8d8f0" opacity="0.4" />
            <rect
              x="155"
              y="130"
              width="30"
              height="50"
              rx="4"
              fill="#7b9fd4"
              opacity="0.8"
            />
            <rect x="155" y="125" width="30" height="8" rx="2" fill="#5a7ab5" />
            <rect
              x="215"
              y="130"
              width="30"
              height="50"
              rx="4"
              fill="#7b9fd4"
              opacity="0.8"
            />
            <rect x="215" y="125" width="30" height="8" rx="2" fill="#5a7ab5" />
          </svg>
        </div>

        <h1 className="not-found__title">Page non trouvée (404)</h1>
        <p className="not-found__text">
          La page que vous avez demandée n'existe pas ou a été déplacée.
        </p>

        <Link to="/" className="not-found__btn">
          Retour Accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
