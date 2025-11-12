import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Auth } from '../../services/auth'; 

// ⭐️ AJOUT: Interface pour typage TypeScript (Basée sur votre ContenuDTO Java) ⭐️
export interface ContenuDTO {
    id: number;
    idFamille: number | null; // Peut être null si PUBLIC_HERITAGE n'a pas d'ID Famille distinct
    idAuteur: number;
    nomAuteur: string;
    idCategorie: number;
    nomCategorie: string;
    titre: string;
    description: string;
    typeContenu: string;
    urlFichier: string;
    urlPhoto: string;
    tailleFichier: number;
    duree: number;
    dateEvenement: Date;
    lieu: string;
    region: string;
    statut: string;
    dateCreation: string; // Utiliser string pour les dates JSON (LocalDateTime)
    dateModification: string;
}
// ---------------------------------------------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class ContenuApiService {

  private readonly baseUrl = 'http://localhost:8080/api/superadmin/contenus-publics'; 
  
  private http = inject(HttpClient);
  private authService = inject(Auth);

  /**
   * Envoie le contenu (y compris les fichiers) à l'API Spring Boot.
   * @param type Le type de contenu ('conte', 'proverbe', etc.).
   * @param formData L'objet FormData contenant les champs.
   * ⭐️ TYPAGE AJOUTÉ : Retourne un Observable de ContenuDTO. ⭐️
   */
  ajouterContenuPublic(type: string, formData: FormData): Observable<ContenuDTO> {
    
    const token = this.authService.getToken(); 
    
    if (!token) {
      return throwError(() => new Error('Jeton d\'authentification manquant. Connexion Admin requise.'));
    }

    const url = `${this.baseUrl}/${type}`;
    
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` 
    });

    // ⭐️ CORRECTION TS2571 : Ajout du typage <ContenuDTO> à la méthode post ⭐️
    return this.http.post<ContenuDTO>(url, formData, { headers }); 
  }
}