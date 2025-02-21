import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment';


@Injectable({
  providedIn: 'root'
})
export class BookingWebsocketService {
  private bookingUpdates = new BehaviorSubject<any>(null);
  private cable: any;

  constructor() {
    this.connectWebSocket();
  }

  private connectWebSocket() {
    this.cable = new WebSocket(`${environment.WEBSOCKET_URL}/cable`);

    this.cable.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'booking_update') {
        this.bookingUpdates.next(data.booking);
      }
    };

    this.cable.onclose = () => {
      console.warn('WebSocket connection closed. Reconnecting...');
      setTimeout(() => this.connectWebSocket(), 3000);
    };
  }

  getBookingUpdates(): Observable<any> {
    return this.bookingUpdates.asObservable().pipe(map(data => data));
  }
}
