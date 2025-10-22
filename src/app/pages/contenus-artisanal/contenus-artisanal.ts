import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contenus-artisanal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contenus-artisanal.html',
  styleUrls: ['./contenus-artisanal.css']
})
export class ContenusArtisanal {

  photos = [
    {
      titre: 'Motif Bogolan familial',
      categorie: 'Artisanat / photo',
      langue: 'Bambara',
      image: 'bogolan-textile-pattern.jpg',
      description: 'Tissu bogolan avec le symbole de notre famille',
      auteur: 'Oumou Diakité',
      date: '16/10/2025'
    }
  ];

  selectedPhoto: any = null;

  openModal(photo: any) {
    this.selectedPhoto = photo;
  }

  closeModal() {
    this.selectedPhoto = null;
  }
}
