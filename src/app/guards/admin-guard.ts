import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth'; // Chemin vers votre service Auth

/**
 * Garde de route basique pour l'accès administrateur. 
 * Vérifie simplement la présence du token.
 * ⚠️ À améliorer pour inclure le décodage et la vérification du rôle 'ADMIN'.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Dans un vrai scénario, vous vérifieriez ici : authService.hasRole('ADMIN')
    return true; // Accès autorisé si un token est présent
  } else {
    console.error("Accès refusé. Non authentifié ou rôle insuffisant.");
    // Redirection vers la page de connexion
    return router.createUrlTree(['/login']);
  }
};