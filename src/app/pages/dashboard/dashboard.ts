import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SuperAdminDashboardDTO, ContenuRecentDTO } from '../../interfaces/dashboard-dto.interface';
import { DashboardService } from '../../sevices/dashboard-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // DatePipe est injecté ici, mais nous allons l'utiliser directement dans le template
  // pour le formatDate afin de suivre l'approche Angular idiomatique.
  imports: [CommonModule, DatePipe], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  // Propriétés pour l'affichage
  dashboardData: SuperAdminDashboardDTO | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  adminName: string = "Super Admin"; // Valeur par défaut
  datePipe: any;

  // Injection du service et de DatePipe (pour la méthode formatDate)
  constructor(
    private dashboardService: DashboardService,
    ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    // Idéalement, charger le nom de l'admin ici depuis un service d'authentification
    // Exemple: this.authService.getCurrentUser().subscribe(user => this.adminName = user.prenom);
  }

  /**
   * Charge les données du tableau de bord depuis le backend.
   */
  loadDashboardData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.dashboardService.getDashboardComplet().subscribe({
      next: (data: SuperAdminDashboardDTO) => { // Type de données explicite
        this.dashboardData = data;
        this.isLoading = false;
        console.log("Données du Dashboard chargées:", data);
      },
      error: (err) => {
        // Mieux gérer l'erreur HTTP
        this.errorMessage = err.message || "Échec de la récupération des données du tableau de bord.";
        this.isLoading = false;
        console.error("Erreur de chargement du dashboard:", err);
      }
    });
  }

  /**
   * Retourne le nom de l'icône Material Design approprié pour un type de contenu.
   */
  getMaterialIconName(type: ContenuRecentDTO['typeContenu']): string {
    switch (type) {
      case 'CONTE': return 'book';
      case 'ARTISANAT': return 'brush'; // Icône plus spécifique à l'artisanat
      case 'PROVERBE': return 'format_quote';
      case 'DEVINETTE': return 'quiz'; // Icône quiz est plus pertinent que music_note
      case 'PHOTO': return 'photo_library';
      default: return 'list_alt'; // Icône par défaut
    }
  }

  /**
   * Retourne la classe CSS d'icône appropriée pour un type de contenu.
   * Cette méthode est gardée pour appliquer des styles spécifiques si besoin.
   */
  getIconClass(type: ContenuRecentDTO['typeContenu']): string {
    switch (type) {
      case 'CONTE': return 'item-icon-book';
      case 'ARTISANAT': return 'item-icon-artisanat';
      case 'PROVERBE': return 'item-icon-proverbe';
      case 'DEVINETTE': return 'item-icon-devinette';
      case 'PHOTO': return 'item-icon-photo';
      default: return 'item-icon-default';
    }
  }

  /**
   * Formate la date pour l'affichage (gardée si le pipe direct dans le HTML est jugé moins flexible).
   */
  formatDate(date: string | Date): string | null {
    // Note: Utiliser le datePipe injecté (this.datePipe) est plus performant 
    // que de créer une nouvelle instance à chaque appel.
    return this.datePipe.transform(date, 'dd/MM/yyyy', undefined, 'fr-FR');
  }
}