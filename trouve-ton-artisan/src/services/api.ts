const BASE_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const API_KEY: string = import.meta.env.VITE_API_KEY ?? "";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function apiFetch(endpoint: string, options: FetchOptions = {}) {
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
export const fetchArtisansByCategorie = (id: number) => apiFetch("/artisans/categorie/" + id);
export const searchArtisans = (nom: string) => apiFetch("/artisans/recherche/" + encodeURIComponent(nom));
export const fetchArtisan = (id: number) => apiFetch("/artisans/" + id);
export const sendContactForm = (artisanId: number, data: Record<string, string>) =>
  apiFetch("/artisans/" + artisanId + "/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });