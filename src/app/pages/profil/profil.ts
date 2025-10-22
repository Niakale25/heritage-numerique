import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AdminProfile {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  role: string;
  memberSince: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
@Component({
  selector: 'app-profil',
  imports: [FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil {
  // Données de l'administrateur
  profile: AdminProfile = {
    lastName: 'Diakité',
    firstName: 'Niakalé',
    email: 'niakalé.diakite@mail.com',
    phone: '07 55 55 55 55',
    role: 'Administrateur',
    memberSince: '16/10/2025',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  // État du composant
  isEditing = false;
  showPassword = false;

  constructor() { }

  /**
   * Active ou désactive le mode édition
   */
  toggleEditMode(enable: boolean): void {
    this.isEditing = enable;
    if (!enable) {
      // Annuler les modifications (si l'annulation était complète, il faudrait une sauvegarde)
      this.profile.newPassword = '';
      this.profile.confirmPassword = '';
    }
  }

  /**
   * Simule l'enregistrement du profil
   */
  saveProfile(): void {
    if (this.profile.newPassword !== this.profile.confirmPassword) {
      console.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    // Logique d'appel API pour la mise à jour des données...
    console.log('Profil mis à jour:', this.profile);
    this.isEditing = false;
  }
}