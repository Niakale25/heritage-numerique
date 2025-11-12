import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html', // Pointage vers le fichier HTML séparé
  styleUrls: ['./login.css'] // Pointage vers le fichier CSS séparé
})
export class Login { 
  email: string = '';
  motDePasse: string = '';
  loading = false;

  // Variables d'état locales pour les messages
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private authService: Auth, 
    private router: Router
  ) {}

  onLogin() {
    // Effacer les messages précédents
    this.errorMessage = null; 
    this.successMessage = null;

    if (!this.email || !this.motDePasse) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    this.loading = true;

    const credentials = {
      email: this.email,
      motDePasse: this.motDePasse
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie ', response);
        this.successMessage = 'Connexion réussie ! Redirection...';
        this.router.navigate(['/accueil/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erreur de connexion ', err);
        this.loading = false;
        
        // Attribution du message d'erreur directement à la variable locale
        if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        } else if (err.status === 403) {
          this.errorMessage = 'Accès refusé. Vérifiez vos permissions.';
        } else if (err.status === 0) {
           // L'erreur 0 est souvent CORS (bloqué par le navigateur) ou le serveur est éteint
           this.errorMessage = 'Erreur de connexion. Vérifiez que le serveur backend (Spring Boot) est démarré et que la configuration CORS est correcte (port 4200 autorisé).';
        } else if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Erreur inattendue lors de la connexion.';
        }
      }
    });
  }
}
