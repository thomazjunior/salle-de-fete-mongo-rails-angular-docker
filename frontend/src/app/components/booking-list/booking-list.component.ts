import { Component, OnInit } from '@angular/core';
import { BookingWebsocketService } from '../../services/booking-websocket.service';

@Component({
  selector: 'app-booking-list',  // Utilisation dans HTML : <app-booking-list></app-booking-list>
  templateUrl: './booking-list.component.html', // Fichier HTML associé
  styleUrls: ['./booking-list.component.scss'] // Fichier CSS associé
})
export class BookingListComponent implements OnInit {  
  bookings: any[] = []; // Variable qui stocke la liste des réservations

  constructor(private bookingWebsocketService: BookingWebsocketService) {}

  ngOnInit(): void {
    // À l'initialisation du composant, on souscrit au service WebSocket
    this.bookingWebsocketService.getBookingUpdates().subscribe(updatedBooking => {
      if (updatedBooking) {
        const index = this.bookings.findIndex(b => b.id === updatedBooking.id);
        if (index !== -1) {
          this.bookings[index] = updatedBooking;
        } else {
          this.bookings.push(updatedBooking);
        }
      }
    });
  }
}
