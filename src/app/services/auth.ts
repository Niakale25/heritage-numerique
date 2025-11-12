import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
// J'ai besoin de définir API_BASE_URL comme constante ou l'importer si elle existe ailleurs
const API_BASE_URL = 'http://localhost:8080/api'; 

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = `${API_BASE_URL}/auth`;
  private readonly TOKEN_KEY = 'token'; // Clé utilisée dans votre implémentation
  
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; motDePasse: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          localStorage.setItem(this.TOKEN_KEY, res.accessToken); // Stockage de l'accessToken
        }
      })
    );
  }

  register(data: {
    nom: string;
    prenom?: string;
    email: string;
    motDePasse: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
