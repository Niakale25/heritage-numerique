import { Component, OnInit, inject, ChangeDetectionStrategy, Signal, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router'; 
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContenuGlobalDto } from './contenu-global.dto';

@Component({
selector: 'app-conte',
standalone: true,
imports: [CommonModule],
 templateUrl: './conte.html',
styleUrls: ['./conte.css'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Conte implements OnInit {
 // --- Signals ---
 contes: WritableSignal<ContenuGlobalDto[]> = signal([]);
 searchTerm = signal('');
 selectedRegion = signal<string | null>(null);
 isFilterMenuOpen = signal(false);
 isLoading = signal(false);
 error = signal<string | null>(null);

 private http = inject(HttpClient);
 private router = inject(Router); // ⭐️ Injection du Router
 private apiBase = 'http://localhost:8080/api/superadmin/dashboard';
 private resourceBaseUrl = 'http://localhost:8080';

// Propriétés d'interface (nécessaires pour éviter des erreurs de compilation)
 regionFamille: any;
 titre: any;
 nomCreateur: any;
 prenomCreateur: string | undefined;
 nomFamille: any;
 id: any;

 // --- Regions uniques ---
uniqueRegions: Signal<string[]> = computed(() => {
 const set = new Set<string>();
 this.contes().forEach(c => {
 if (c.regionFamille) set.add(c.regionFamille);
 });
 return Array.from(set).sort((a, b) => a.localeCompare(b));
 });

 // --- Contes filtrés ---
 filteredContes: Signal<ContenuGlobalDto[]> = computed(() => {
 const term = this.searchTerm().toLowerCase().trim();
 const region = this.selectedRegion();
 return this.contes().filter(c => {
 const matchesSearch =
 !term ||
 (c.titre && c.titre.toLowerCase().includes(term)) ||
 (c.nomCreateur && c.nomCreateur.toLowerCase().includes(term)) || // Utiliser nomAuteur si disponible
 (c.prenomCreateur && c.prenomCreateur.toLowerCase().includes(term))||
 (c.nomFamille && c.nomFamille.toLowerCase().includes(term)) ||
 (c.regionFamille && c.regionFamille.toLowerCase().includes(term));
 const matchesRegion = !region || c.regionFamille === region;
 return matchesSearch && matchesRegion;
 });
 });

 ngOnInit(): void {
 this.fetchContes();
 }
 // --- Fetch depuis API ---
 fetchContes(): void {
this.isLoading.set(true);
 this.error.set(null);

 this.http.get<ContenuGlobalDto[]>(`${this.apiBase}/contes`)
 .pipe(
 catchError(err => {
 console.error('Erreur API contes', err);
 this.error.set('Impossible de charger les contes depuis le serveur.');
 this.isLoading.set(false);
 return of([] as ContenuGlobalDto[]);
 })
 )
 .subscribe(data => {
 this.contes.set(data || []);
 this.isLoading.set(false);
 });
 }

 // MÉTHODE DE NAVIGATION CORRIGÉE
 viewConteDetails(id: number): void {
 // Navigue vers la route configurée pour le détail du conte
 this.router.navigate(['/accueil/conte', id]);
 }

 // --- Méthodes utilitaires ---
 updateSearchTerm(event: Event): void {
 this.searchTerm.set((event.target as HTMLInputElement).value || '');
 }

 toggleFilterMenu(): void {
this.isFilterMenuOpen.update(v => !v);
 }

 selectRegion(region: string | null): void {
 this.selectedRegion.set(region);
 this.isFilterMenuOpen.set(false);
 }

 countContesByRegion(region: string): number {
 return this.contes().filter(c => c.regionFamille === region).length;
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

 formatCreationDate(dateString?: string): string {
 if (!dateString) return '';
try {
 return new Date(dateString).toLocaleDateString('fr-FR', {
 year: 'numeric', month: 'short', day: 'numeric'
});
} catch {
 return dateString;
 }
 }

 modifierConte(conte: ContenuGlobalDto): void {
 console.log('Modifier :', conte);
 // Ici, implémenter la navigation vers la page d'édition ou un modal
 }

 supprimerConteLocally(conte: ContenuGlobalDto): void {
 // Remplacer par un composant modal personnalisé, pas de confirm()
 console.log('Demande de suppression pour :', conte);
 // Simulation de suppression locale
 this.contes.update(list => list.filter(c => c.id !== conte.id));
 }
}