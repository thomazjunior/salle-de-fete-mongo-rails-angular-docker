import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; //TODO: should be replaced with a environment variable

  constructor(private http: HttpClient) {}

  //Exemple de méthod pour récupérer des données
  getClients(): Observable<any> {
    //TODO: add type checking

   /*  // Return an observable with mock data
    const mockClients = [
      { id: 1, name: 'Client 1', email: 'client1@example.com' },
      { id: 2, name: 'Client 2', email: 'client2@example.com' },
      { id: 3, name: 'Client 3', email: 'client3@example.com' },
    ];

    return of(mockClients); // 'of' creates an Observable from the mock data */

    return this.http.get(`${this.apiUrl}/clients`);
  }

  // Exemple de méthod pour ajouter les données
  addClient(client: any): Observable<any> {
    //TODO: add type checking
    return this.http.post(`${this.apiUrl}/clients`, client);
  }
}
