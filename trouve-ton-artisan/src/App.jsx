import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ArtisanList from "./pages/ArtisanList/ArtisanList";
import ArtisanDetail from "./pages/ArtisanDetail/ArtisanDetail";
import Legal from "./pages/Legal/Legal";
import NotFound from "./pages/NotFound/NotFound";
import "./styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie/:slug" element={<ArtisanList />} />
          <Route path="/recherche" element={<ArtisanList />} />
          <Route path="/artisan/:id" element={<ArtisanDetail />} />
          <Route
            path="/mentions-legales"
            element={<Legal page="mentions-legales" />}
          />
          <Route
            path="/donnees-personnelles"
            element={<Legal page="donnees-personnelles" />}
          />
          <Route
            path="/accessibilite"
            element={<Legal page="accessibilite" />}
          />
          <Route path="/cookies" element={<Legal page="cookies" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
