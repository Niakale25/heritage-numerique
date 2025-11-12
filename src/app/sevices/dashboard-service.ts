// src/app/services/dashboard-service.ts (ou le chemin approprié)

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { SuperAdminDashboardDTO } from '../interfaces/dashboard-dto.interface';
import { FamilleSuperAdminDTO } from '../interfaces/famille-super-admin-dto.interface';
// Assurez-vous que FamilleSuperAdminDTO est bien importé

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // Le chemin de base pour le contrôleur du dashboard SuperAdmin
  private apiUrl = `${API_BASE_URL}/superadmin/dashboard`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les données agrégées du tableau de bord.
   * Endpoint : GET /api/superadmin/dashboard
   * @returns Un Observable du DTO complet du tableau de bord.
   */
  getDashboardComplet(): Observable<SuperAdminDashboardDTO> {
    // Appel à GET /api/superadmin/dashboard
    return this.http.get<SuperAdminDashboardDTO>(this.apiUrl).pipe(
      catchError((error) => {
        console.error("Erreur lors de la récupération du dashboard:", error);
        // Propagation de l'erreur pour que le composant puisse l'afficher
        return throwError(() => new Error('Échec de la récupération des données du tableau de bord.'));
      })
    );
  }

  /**
   * Récupère la liste complète de toutes les familles.
   * Endpoint : GET /api/superadmin/dashboard/familles
   * @returns Un Observable de la liste des FamilleSuperAdminDTO.
   */
  getAllFamilles(): Observable<FamilleSuperAdminDTO[]> {
    return this.http.get<FamilleSuperAdminDTO[]>(`${this.apiUrl}/familles`).pipe(
      catchError((error) => {
        console.error("Erreur lors de la récupération des familles:", error);
        // Propagation de l'erreur pour que le composant puisse l'afficher
        return throwError(() => new Error('Échec de la récupération de la liste des familles.'));
      })
    );
  }
}