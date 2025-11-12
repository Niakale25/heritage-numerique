import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  WritableSignal,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ContenuGlobalDto } from '../conte/contenu-global.dto';

@Component({
  selector: 'app-proverbe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proverbe.html',
  styleUrls: ['./proverbe.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Proverbe implements OnInit {
  private http = inject(HttpClient);

  Proverbs: WritableSignal<ContenuGlobalDto[]> = signal([]);
  showAddModal: WritableSignal<boolean> = signal(false);
  showEditModal: WritableSignal<boolean> = signal(false);

  // 🔹 Data pour la création
  newProverbData = {
    titre: '',
    origineProverbe: '',
    significationProverbe: '',
    texteProverbe: 'Non applicable',
    photoProverbe: null as File | null
  };

  // 🔹 Data pour la modification
  selectedProverb: ContenuGlobalDto | null = null;
  editProverbData = {
    titre: '',
    origineProverbe: '',
    significationProverbe: '',
    texteProverbe: 'Non applicable',
    photoProverbe: null as File | null
  };

  // URLs backend
  private backendOrigin = 'http://localhost:8080';
  private apiUrl = 'http://localhost:8080/api/superadmin/contenus-publics';
  private apiDeleteUrl = 'http://localhost:8080/api/superadmin/dashboard/proverbes';

  ngOnInit(): void {
    this.loadProverbs();
  }

  /** 🔹 Charger tous les proverbes depuis le backend */
  loadProverbs(): void {
    this.http.get<ContenuGlobalDto[]>(this.apiUrl).subscribe({
      next: (contenus) => {
        const proverbes = contenus.filter(c => c.typeContenu?.toUpperCase() === 'PROVERBE');
        this.Proverbs.set(proverbes);
        console.log('✅ Proverbes chargés:', proverbes);
      },
      error: (err) => console.error('❌ Erreur chargement proverbes:', err)
    });
  }

  /** 🔹 Ouvrir la modale d’ajout */
  addProverb(): void {
    this.newProverbData = {
      titre: '',
      origineProverbe: '',
      significationProverbe: '',
      texteProverbe: 'Non applicable',
      photoProverbe: null
    };
    this.showAddModal.set(true);
  }

  /** 🔹 Fermer la modale d’ajout */
  closeAddModal(): void {
    this.showAddModal.set(false);
  }

  /** 🔹 Fermer la modale d’édition */
  closeEditModal(): void {
    this.showEditModal.set(false);
    this.selectedProverb = null;
    this.editProverbData.photoProverbe = null;
  }

  /** 🔹 Gérer le choix du fichier image (ajout) */
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.newProverbData.photoProverbe = file;
  }

  /** 🔹 Gérer le choix du fichier image (édition) */
  onEditPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.editProverbData.photoProverbe = file;
  }

  /** 🔹 Envoi du nouveau proverbe */
  submitNewProverb(event: Event): void {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titre', this.newProverbData.titre);
    formData.append('origineProverbe', this.newProverbData.origineProverbe);
    formData.append('significationProverbe', this.newProverbData.significationProverbe);
    formData.append('texteProverbe', this.newProverbData.texteProverbe);

    if (this.newProverbData.photoProverbe) {
      formData.append('photoProverbe', this.newProverbData.photoProverbe);
    }

    this.http.post(`${this.apiUrl}/proverbe`, formData).subscribe({
      next: (res) => {
        console.log('✅ Proverbe ajouté:', res);
        this.loadProverbs();
        this.closeAddModal();
      },
      error: (err) => console.error('❌ Erreur ajout proverbe:', err)
    });
  }

  /** 🔹 Ouvrir la modale d’édition */
  editProverb(proverb: ContenuGlobalDto): void {
    this.selectedProverb = proverb;
    this.editProverbData = {
      titre: proverb.titre || '',
      origineProverbe: proverb.origineProverbe || '',
      significationProverbe: proverb.significationProverbe || '',
      texteProverbe: proverb.texteProverbe || 'Non applicable',
      photoProverbe: null
    };
    this.showEditModal.set(true);
  }

  /** 🔹 Soumettre la modification */
  submitEditProverb(event: Event): void {
    event.preventDefault();
    if (!this.selectedProverb?.id) return;

    const formData = new FormData();
    formData.append('titre', this.editProverbData.titre);
    formData.append('origineProverbe', this.editProverbData.origineProverbe);
    formData.append('significationProverbe', this.editProverbData.significationProverbe);
    formData.append('texteProverbe', this.editProverbData.texteProverbe);

    if (this.editProverbData.photoProverbe) {
      formData.append('photoProverbe', this.editProverbData.photoProverbe);
    }

    this.http.put(`${this.apiUrl}/proverbe/${this.selectedProverb.id}`, formData).subscribe({
      next: (res) => {
        console.log('✅ Proverbe modifié:', res);
        this.loadProverbs();
        this.closeEditModal();
      },
      error: (err) => console.error('❌ Erreur modification proverbe:', err)
    });
  }

  /** 🔹 Supprimer un proverbe */
  deleteProverb(id: number | undefined): void {
    if (!id) return;
    if (confirm('Voulez-vous vraiment supprimer ce proverbe ?')) {
      this.http.delete(`${this.apiDeleteUrl}/${id}`).subscribe({
        next: () => {
          console.log(`✅ Proverbe ID ${id} supprimé.`);
          this.loadProverbs();
        },
        error: (err) => console.error(`❌ Erreur suppression proverbe ID ${id}:`, err)
      });
    }
  }

  /** 🔹 Retourne l’URL d’image correcte */
  getPhotoUrl(proverb: ContenuGlobalDto): string {
    if (proverb.photoProverbe) {
      // Si c’est une URL absolue on la garde, sinon on la complète
      if (proverb.photoProverbe.startsWith('http')) return proverb.photoProverbe;
      return `http://localhost:8080/${proverb.photoProverbe}`;
    }

    if (proverb.urlPhoto) {
      if (proverb.urlPhoto.startsWith('http')) return proverb.urlPhoto;
      return `http://localhost:8080/${proverb.urlPhoto}`;
    }

    // Image par défaut si rien trouvé
    return 'https://placehold.co/267x120/E8D6B7/333333?text=Proverbe';
  }

  /** 🔹 Visualiser un proverbe (debug / futur modal détail) */
  viewProverb(proverb: ContenuGlobalDto): void {
    console.log(' Voir proverbe:', proverb);
  }
}
