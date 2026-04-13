export interface Specialite {
  id: number;
  nom: string;
  id_categorie: number;
}

export interface Artisan {
  id: number;
  nom: string;
  note: number;
  ville: string;
  code_postal?: string;
  a_propos?: string;
  email: string;
  site_web?: string;
  top_artisan: boolean;
  Specialite?: Specialite;
}
