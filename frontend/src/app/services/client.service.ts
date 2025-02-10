import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environment';
import { Client } from '../models/client.model';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = `${environment.apiBaseUrl}/clients`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ✅ Get all clients
  getClients(): Observable<Client[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.authService.getToken()}`
    );
    return this.http
      .get<Client[]>(this.apiUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Get a single client by ID
  getClientById(id: string): Observable<Client> {
    return this.http
      .get<Client>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Search clients by a key-value pair
  searchClients(key: string, value: string): Observable<Client[]> {
    const params = new HttpParams().set('key', key).set('value', value);
    return this.http
      .get<Client[]>(`${this.apiUrl}/search`, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Create a new client
  addClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(this.apiUrl, client)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Create multiple clients at once
  addClientsBulk(clients: Client[]): Observable<Client[]> {
    return this.http
      .post<Client[]>(`${this.apiUrl}/bulk`, { clients })
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Update an existing client
  updateClient(id: string, client: Partial<Client>): Observable<Client> {
    return this.http
      .put<Client>(`${this.apiUrl}/${id}`, client)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Delete a client by ID
  deleteClient(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  // ✅ Delete clients by a specific property (e.g., name, email)
  deleteClientsByProperty(key: string, value: string): Observable<void> {
    const params = new HttpParams().set('key', key).set('value', value);
    return this.http
      .delete<void>(`${this.apiUrl}/by_property`, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  // 🔥 Centralized error handling
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
