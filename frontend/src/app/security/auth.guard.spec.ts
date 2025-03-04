import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Assurez-vous d'avoir un AuthService pour gérer l'authentification

@Injectable({
  providedIn: 'root', // Fournit ce service à l'ensemble de l'application
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Vérifie si l'utilisateur est authentifié avant d'accéder à une route protégée.
   * @returns {boolean} Retourne `true` si l'utilisateur est authentifié, sinon redirige vers la page de connexion.
   */
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
      return false;
    }
    return true; // Autorise l'accès à la route si l'utilisateur est authentifié
  }
}
