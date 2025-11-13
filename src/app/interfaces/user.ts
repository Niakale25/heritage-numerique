// src/app/interfaces/user.ts

// Correspond au DTO UtilisateurSuperAdminDTO de Spring Boot
export interface UtilisateurSuperAdminDTO {
  id: number;
  nomComplet: string; // "P.N. Prenom Nom"
  role: string;
  telephone: string;
  email: string;
  dateAjout: string; // Sera une chaîne de caractères (ISO string)
  actif: boolean;
  
  // Note: 'family' et 'image' ne sont pas dans votre DTO Spring Boot actuel.
  // Nous devrons les simuler/calculer dans le composant.
  family?: string; 
  image?: string;
}