import { Component, OnInit } from '@angular/core';
import { BookingWebsocketService } from '../../services/booking-websocket.service';


@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];

  constructor(private bookingWebsocketService: BookingWebsocketService) {}

  ngOnInit(): void {
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
