// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilisateurSuperAdminDTO } from '../interfaces/user'; // Assurez-vous d'importer le DTO correct

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/superadmin/dashboard/utilisateurs';

  constructor(private http: HttpClient) { }

  /**
   * Récupère tous les utilisateurs (sans pagination)
   */
  getAllUsers(): Observable<UtilisateurSuperAdminDTO[]> {
    return this.http.get<UtilisateurSuperAdminDTO[]>(this.apiUrl);
  }

  /**
   * Active ou désactive un utilisateur
   */
  toggleUserActivation(userId: number, actif: boolean): Observable<void> {
    const url = `${this.apiUrl}/${userId}/activation`;
    let params = new HttpParams().set('actif', actif.toString()); 
    // PATCH /api/superadmin/dashboard/utilisateurs/{id}/activation?actif=...
    return this.http.patch<void>(url, null, { params });
  }
}