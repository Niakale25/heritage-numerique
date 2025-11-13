import { Component, signal, WritableSignal, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UtilisateurSuperAdminDTO } from '../../interfaces/user';
import { UserService } from '../../services/user-service';

// La propriété 'family' a été retirée de la définition de User
type User = UtilisateurSuperAdminDTO & { image: string, name: string };

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './utilisateur.html',
  styleUrls: ['./utilisateur.css']
})
export class Utilisateur implements OnInit {

  private userService = inject(UserService);

  users: WritableSignal<User[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (dtos: UtilisateurSuperAdminDTO[]) => {
        const mappedUsers: User[] = dtos.map(dto => ({
          ...dto,
          name: dto.nomComplet,
          actif: dto.actif,
          telephone: dto.telephone,
          dateAjout: dto.dateAjout,
          // La propriété 'family' n'est plus mappée ici
          image: this.generateAvatarUrl(dto.nomComplet)
        }));
        this.users.set(mappedUsers);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs:', err);
        this.isLoading.set(false);
        this.users.set([]);
      }
    });
  }

  toggleUserStatus(user: User): void {
    const newStatus = !user.actif;
    this.userService.toggleUserActivation(user.id, newStatus).subscribe({
      next: () => {
        this.users.update(currentUsers =>
          currentUsers.map(u =>
            u.id === user.id ? { ...u, actif: newStatus } : u
          )
        );
      },
      error: (err) => {
        console.error(`Erreur lors de la mise à jour de ${user.nomComplet}`, err);
      }
    });
  }

  private generateAvatarUrl(fullName: string): string {
    const parts = fullName.split(' ');
    if (parts.length < 2) return 'https://placehold.co/35x35/967B56/ffffff?text=U';
    const initiales = `${fullName.charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    return `https://placehold.co/35x35/967B56/ffffff?text=${initiales}`;
  }
}