const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(BASE_URL + endpoint, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) throw new Error("Erreur " + response.status);
  return response.json();
}

export const fetchCategories = () => apiFetch("/categories");
export const fetchArtisansDuMois = () => apiFetch("/artisans/du-mois");
export const fetchArtisansByCategorie = (slug) =>
  apiFetch("/artisans?categorie=" + encodeURIComponent(slug));
export const searchArtisans = (query) =>
  apiFetch("/artisans?search=" + encodeURIComponent(query));
export const fetchArtisan = (id) => apiFetch("/artisans/" + id);
export const sendContactForm = (artisanId, data) =>
  apiFetch("/artisans/" + artisanId + "/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
