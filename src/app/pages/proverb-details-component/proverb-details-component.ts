import { Component, signal, WritableSignal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContenuGlobalDto } from '../conte/contenu-global.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proverb-details-component',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './proverb-details-component.html',
  styleUrls: ['./proverb-details-component.css'],
})
export class ProverbDetailsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  proverbData: WritableSignal<ContenuGlobalDto | null> = signal(null);

  backendUrl = 'http://localhost:8080/api/superadmin/dashboard/proverbes';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProverbDetails(+id);
    }
  }

  /** Charger le détail du proverbe depuis le backend */
  loadProverbDetails(id: number): void {
    this.http.get<ContenuGlobalDto>(`${this.backendUrl}/${id}`).subscribe({
      next: (data) => {
        this.proverbData.set(data);
        console.log('Détail du proverbe:', data);
      },
      error: (err) => console.error('Erreur chargement détail proverbe:', err)
    });
  }

  /** Retour arrière */
  goBack(): void {
    history.back();
  }
}
