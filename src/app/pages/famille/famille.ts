// src/app/pages/famille/famille.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Nécessaire pour [(ngModel)]
import { DashboardService } from '../../sevices/dashboard-service';
import { FamilleSuperAdminDTO } from '../../interfaces/famille-super-admin-dto.interface';

// Assurez-vous d'importer FamilleSuperAdminDTO depuis le bon fichier

@Component({
  selector: 'app-famille',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule], // Ajout de FormsModule
  templateUrl: './famille.html',
  styleUrl: './famille.css'
})
// 🛑 CORRECTION TS2305 : Le nom de la classe exportée est FamilleComponent
export class Famille implements OnInit { 

  familles: FamilleSuperAdminDTO[] = [];
  famillesFiltrees: FamilleSuperAdminDTO[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  adminName: string = "Super Admin";

  searchTerm: string = '';
  filterPeriod: string = 'all'; 

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadAllFamilles();
  }

  loadAllFamilles(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.dashboardService.getAllFamilles().subscribe({
      next: (data) => {
        this.familles = data;
        this.isLoading = false;
        this.applyFilters();
      },
      error: (err) => {
        this.errorMessage = err.message || "Erreur lors du chargement des familles.";
        this.isLoading = false;
        console.error("Erreur de chargement des familles:", err);
      }
    });
  }

  /**
   * Applique les filtres de recherche et de période aux données.
   */
  applyFilters(): void {
    let tempFamilles = [...this.familles];
    const search = this.searchTerm.toLowerCase();

    // 1. Filtrage par Recherche (correction des erreurs TS18048)
    if (search) {
      tempFamilles = tempFamilles.filter(famille => {
        // L'opérateur de coalescence (?? '') est utilisé pour s'assurer que .toLowerCase() est appelé sur une chaîne.
        return (famille.nom ?? '').toLowerCase().includes(search) ||
               (famille.nomAdmin ?? '').toLowerCase().includes(search) ||
               (famille.prenomAdmin ?? '').toLowerCase().includes(search);
      });
    }
    
    // 2. Filtrage par Période (correction de l'erreur TS2769)
    if (this.filterPeriod !== 'all') {
      const today = new Date();
      let cutOffDate = new Date();

      if (this.filterPeriod === 'last_week') {
        cutOffDate.setDate(today.getDate() - 7); 
      } else if (this.filterPeriod === 'last_month') {
        cutOffDate.setDate(today.getDate() - 30);
      }

      tempFamilles = tempFamilles.filter(famille => {
        // Correction TS2769: On s'assure que 'dateCreation' est une chaîne valide avant 'new Date()'.
        // Si 'dateCreation' est null ou undefined (ce qui n'est pas censé arriver avec l'interface), 
        // on peut utiliser une date arbitraire pour éviter le crash.
        const creationDate = new Date(famille.dateCreation); 
        return !isNaN(creationDate.getTime()) && creationDate >= cutOffDate;
      });
    }

    this.famillesFiltrees = tempFamilles;
  }
  
  /**
   * 🛑 CORRECTION TS2345 : Assure que le paramètre est traité comme un boolean
   * en utilisant l'opérateur de coalescence nulle (?? false).
   */
  getStatusLabel(isActive: boolean | null): string {
      return (isActive ?? false) ? 'Actif' : 'Inactif';
  }
}