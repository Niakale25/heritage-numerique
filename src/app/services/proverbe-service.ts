// src/app/services/proverbe.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Adaptez cette interface si nécessaire pour correspondre exactement à ContenuGlobalDTO
export interface Proverb {
  id: number;
  text: string; // Correspond au titre ou à la description dans le DTO
  origin: string; // Peut correspondre à regionFamille ou à une donnée spécifique à trouver
  imageUrl: string; // Correspond à urlPhoto / thumbnailUrl
  meaning: string; // Correspond à la description ou à une donnée spécifique à trouver
}

// Interface pour la création (Payload du POST/PUT)
export interface NewProverbPayload {
  titre: string; // Le texte du proverbe
  origineProverbe: string; // L'origine du proverbe
  texteProverbe: string; // Le texte du proverbe (doublon possible avec titre)
  significationProverbe: string; // La signification
  // Les autres champs 'MultipartFile' sont gérés par FormData
  // photoProverbe: File | null;
  lieu?: string;
  region?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProverbeService {
  private apiUrl = 'http://localhost:8080/api/superadmin/dashboard/proverbes';
  private publicContenuUrl = 'http://localhost:8080/api/superadmin/contenus-publics/proverbe'; // Pour POST/PUT

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les proverbes depuis le backend (GET /api/superadmin/dashboard/proverbes)
   * NOTE: Le DTO ContenuGlobalDTO (du backend) doit être mappé vers l'interface Proverb (du frontend).
   */
  getAllProverbes(): Observable<any[]> { // Utilisez ContenuGlobalDTO[] comme type de retour si vous avez le DTO exact
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Ajoute un nouveau proverbe (POST /api/superadmin/contenus-publics/proverbe)
   */
  addProverbe(payload: NewProverbPayload, photo: File | null): Observable<any> {
    const formData = new FormData();
    // Les requêtes POST/PUT sont en 'multipart/form-data'
    formData.append('titre', payload.titre);
    formData.append('origineProverbe', payload.origineProverbe);
    formData.append('texteProverbe', payload.texteProverbe);
    formData.append('significationProverbe', payload.significationProverbe);
    
    if (photo) {
      formData.append('photoProverbe', photo);
    }
    // Ajoutez lieu/region si nécessaire
    // formData.append('lieu', payload.lieu || ''); 

    return this.http.post<any>(this.publicContenuUrl, formData);
  }

  /**
   * Supprime un proverbe (DELETE /api/superadmin/dashboard/proverbes/{id})
   */
  deleteProverbe(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // NOTE: L'implémentation de editProverb nécessiterait une logique de FormData similaire à addProverbe,
  // ciblant l'endpoint PUT /api/superadmin/contenus-publics/proverbe/{id}
}