import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';



export interface Reservation {
  id: string;
  date: string;
  heure_debut: string;
  heure_fin: string;
  nombre_invites: number;
  statut: number; // 1: Confirmée, 2: En attente, 3: Annulée
  valeur_totale: number;
  client_id: string;
  forfait_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceReservation {
  private apiUrl = `${environment.apiBaseUrl}/reservations`;
  //private socket: Socket;
  private socket: any;

  constructor(private http: HttpClient) {
    // Connexion au serveur WebSocket
    //this.socket = io(environment.WEBSOCKET_URL);
  }

  // Récupérer toutes les réservations
  obtenirReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  // Obtenir une réservation par ID
  obtenirReservationParId(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle réservation
  creerReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, reservation);
  }

  // Mettre à jour une réservation
  mettreAJourReservation(id: string, reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, reservation);
  }

  // Supprimer une réservation
  supprimerReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Écouter les mises à jour des réservations en temps réel
  surReservationMiseAJour(): Observable<Reservation> {
    return new Observable(observer => {
      this.socket.on('reservationMiseAJour', (reservationMiseAJour: Reservation) => {
        observer.next(reservationMiseAJour);
      });
    });
  }

  // Écouter les nouvelles réservations en temps réel
  surNouvelleReservation(): Observable<Reservation> {
    return new Observable(observer => {
      this.socket.on('nouvelleReservation', (nouvelleReservation: Reservation) => {
        observer.next(nouvelleReservation);
      });
    });
  }

  // Déconnexion du WebSocket
  deconnecterWebSocket() {
    this.socket.disconnect();
  }
}
