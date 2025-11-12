import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContenuGlobalDto } from '../pages/conte/contenu-global.dto';

@Injectable({
  providedIn: 'root'
})
export class DevinetteService {
  private apiUrl = 'http://localhost:8080/api/superadmin/contenus-publics'; // ✅ adapte selon ton backend

  constructor(private http: HttpClient) {}

  /** Récupère toutes les devinettes */
  getAllDevinettes(): Observable<ContenuGlobalDto[]> {
    return this.http.get<ContenuGlobalDto[]>(`${this.apiUrl}?type=devinette`);
  }

  /** Récupère une devinette spécifique */
  getDevinetteById(id: number): Observable<ContenuGlobalDto> {
    return this.http.get<ContenuGlobalDto>(`${this.apiUrl}/${id}`);
  }

  /** Ajoute une nouvelle devinette */
  addDevinette(dto: Partial<ContenuGlobalDto>): Observable<ContenuGlobalDto> {
    return this.http.post<ContenuGlobalDto>(`${this.apiUrl}/devinette`, dto);
  }

  /** Supprime une devinette */
  deleteDevinette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
