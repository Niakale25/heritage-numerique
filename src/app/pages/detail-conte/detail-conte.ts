import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ContenuGlobalDto } from '../conte/contenu-global.dto';

@Component({
  selector: 'app-detail-conte',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-conte.html',
  styleUrls: ['./detail-conte.css']
})
export class DetailConte implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apiBase = 'http://localhost:8080/api/superadmin/dashboard';
  private resourceBaseUrl = 'http://localhost:8080';

  conteDetails: WritableSignal<ContenuGlobalDto | null> = signal(null);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage.set('Aucun identifiant de conte fourni.');
      return;
    }
    this.fetchConteDetails(id);
  }

  fetchConteDetails(id: number): void {
    this.isLoading.set(true);
    this.http.get<ContenuGlobalDto>(`${this.apiBase}/contes/${id}`)
      .pipe(
        catchError(err => {
          console.error('Erreur API:', err);
          this.errorMessage.set('Impossible de charger les détails du conte.');
          this.isLoading.set(false);
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.conteDetails.set(data);
        } else {
          this.errorMessage.set('Ce conte est introuvable.');
        }
        this.isLoading.set(false);
      });
  }

 getThumbnailUrl(url?: string): string {
 if (url && url.length > 0) {
 if (url.startsWith('/')) {
 return this.resourceBaseUrl + url;
 }
 return url;
 }

 return 'https://placehold.co/70x70/967B56/FFFFFF?text=Conte';
 }
}
