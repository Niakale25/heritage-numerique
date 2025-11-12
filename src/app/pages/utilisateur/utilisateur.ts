import { Component, signal, WritableSignal } from '@angular/core';

// Interface pour typer les données utilisateur
interface User {
  id: number;
  name: string;
  family: string;
  role: string;
  phone: string;
  email: string;
  dateAdded: string;
  isActive: boolean;
  image: string;
}

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [],
  // Les chemins sont mis à jour pour les fichiers séparés
  templateUrl: './utilisateur.html', 
  styleUrl: './utilisateur.css'
})
export class Utilisateur {
  
  // Utilisation d'un Signal pour stocker et gérer l'état de la liste des utilisateurs
  users: WritableSignal<User[]> = signal([
    { 
      id: 1, name: 'Oumar Dolo', family: 'Famille Dolo', role: 'Administrateur', 
      phone: '75794044', email: 'oumar.dolo@gmail.com', dateAdded: '10/10/2025', 
      isActive: true, image: 'https://placehold.co/35x35/967B56/ffffff?text=OD' 
    },
    { 
      id: 2, name: 'Fatoumata Diarra', family: 'Famille Diarra', role: 'Membre', 
      phone: '66123456', email: 'fatou.diarra@gmail.com', dateAdded: '01/05/2025', 
      isActive: false, image: 'https://placehold.co/35x35/967B56/ffffff?text=FD' 
    },
    { 
      id: 3, name: 'Ahmed Cissé', family: 'Famille Cissé', role: 'Membre', 
      phone: '77889900', email: 'ahmed.cisse@gmail.com', dateAdded: '20/11/2024', 
      isActive: true, image: 'https://placehold.co/35x35/967B56/ffffff?text=AC' 
    },
    { 
      id: 4, name: 'Mariam Traoré', family: 'Famille Traoré', role: 'Membre', 
      phone: '69696969', email: 'mariam.traore@gmail.com', dateAdded: '05/01/2025', 
      isActive: false, image: 'https://placehold.co/35x35/967B56/ffffff?text=MT' 
    },
  ]);

  /**
   * Bascule l'état actif/inactif d'un utilisateur et met à jour le signal.
   * @param user L'objet utilisateur dont il faut basculer l'état.
   */
  toggleUserStatus(user: User): void {
    // Utiliser update pour garantir l'immutabilité et notifier Angular du changement
    this.users.update(currentUsers =>
      currentUsers.map(u => 
        u.id === user.id ? { ...u, isActive: !u.isActive } : u
      )
    );
    // Logique pour appeler un service backend ici
    console.log(`Statut de ${user.name} basculé à : ${user.isActive ? 'Inactif' : 'Actif'}`);
  }
}
