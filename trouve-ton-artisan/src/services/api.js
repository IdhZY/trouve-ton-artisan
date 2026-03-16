const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_KEY = import.meta.env.VITE_API_KEY || "";

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(BASE_URL + endpoint, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) throw new Error("Erreur " + response.status);
  return response.json();
}

export const fetchCategories = () => apiFetch("/artisans/categories");
export const fetchArtisansDuMois = () => apiFetch("/artisans/top/artisans");
export const fetchArtisansByCategorie = (id) =>
  apiFetch("/artisans/categorie/" + id);
export const searchArtisans = (nom) =>
  apiFetch("/artisans/recherche/" + encodeURIComponent(nom));
export const fetchArtisan = (id) => apiFetch("/artisans/" + id);
export const sendContactForm = (artisanId, data) =>
  apiFetch("/artisans/" + artisanId + "/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
