/**
 * Interface pour les données agrégées du dashboard.
 */
export interface SuperAdminDashboardDTO {
  nombreUtilisateurs: number;
  nombreFamilles: number;
  nombreContes: number;
  nombreArtisanats: number;
  nombreProverbes: number;
  nombreDevinettes: number;
  nombreQuizPublics: number;
  contenusRecents: ContenuRecentDTO[];
  famillesRecentes: FamilleRecenteDTO[];
}

/**
 * Interface pour un élément de contenu récent.
 */
export interface ContenuRecentDTO {
  id: number;
  titre: string;
  typeContenu: 'CONTE' | 'ARTISANAT' | 'PROVERBE' | 'DEVINETTE' | 'PHOTO';
  // 'dateCreation' est une chaîne ISO 8601, ce qui correspond à la sérialisation de Java LocalDateTime
  dateCreation: string; 
  nomCreateur: string;
  prenomCreateur: string;
  nomFamille: string;
}

/**
 * Interface pour une famille récente.
 */
export interface FamilleRecenteDTO {
  id: number;
  nom: string;
  description: string;
  ethnie: string;
  region: string;
  // 'dateCreation' est une chaîne ISO 8601
  dateCreation: string; 
  nomAdmin: string;
  prenomAdmin: string;
  nombreMembres: number;
}
