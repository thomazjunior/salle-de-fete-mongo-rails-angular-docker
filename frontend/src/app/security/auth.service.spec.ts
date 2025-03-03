import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  /** Vérifie si le service est créé correctement */
  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  /** Vérifie le processus de connexion avec des identifiants corrects */
  it("devrait connecter l'utilisateur avec les bons identifiants", () => {
    const result = service.login('admin', 'password');
    expect(result).toBeTrue();
    expect(service.isAuthenticated()).toBeTrue();
  });

  /** Vérifie l'échec de la connexion avec des identifiants incorrects */
  it("ne devrait pas connecter l'utilisateur avec des identifiants incorrects", () => {
    const result = service.login('user', 'wrongpassword');
    expect(result).toBeFalse();
    expect(service.isAuthenticated()).toBeFalse();
  });

  /** Vérifie si la déconnexion fonctionne correctement */
  it("devrait déconnecter l'utilisateur", () => {
    service.login('admin', 'password');
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });

  /** Vérifie si le token d'authentification est correctement stocké et récupéré */
  it("devrait retourner le token d'authentification après connexion", () => {
    service.login('admin', 'password');
    expect(service.getToken()).toBe('mocked-jwt-token-1234567890');
  });

  /** Vérifie si un utilisateur possède une permission spécifique */
  it("devrait vérifier si l'utilisateur a une permission donnée", () => {
    expect(service.hasPermission('edit_clients')).toBeTrue();
    expect(service.hasPermission('non_existing_permission')).toBeFalse();
  });
});
