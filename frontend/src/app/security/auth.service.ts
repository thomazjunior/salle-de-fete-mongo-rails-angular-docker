import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedUser = false;
  private mockToken = 'mocked-jwt-token-1234567890';
  private userPermissions = ['view_clients', 'edit_clients', 'delete_clients']; // Mock permissions

  constructor() {}

  /** Simulates user login */
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isAuthenticatedUser = true;
      localStorage.setItem('authToken', this.mockToken);
      return true;
    }
    return false;
  }

  /** Simulates user logout */
  logout(): void {
    this.isAuthenticatedUser = false;
    localStorage.removeItem('authToken');
  }

  /** Checks if user is authenticated */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /** Retrieves the authentication token */
  getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  /** Checks if the user has a specific permission */
  hasPermission(permission: string): boolean {
    return this.userPermissions.includes(permission);
  }
}
