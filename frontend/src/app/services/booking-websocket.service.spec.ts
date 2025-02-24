import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environment';
import { BookingWebsocketService } from './booking-websocket.service';

describe('ServiceWebsocketReservation', () => {
  let service: BookingWebsocketService;
  let mockWebSocket: any;

  beforeEach(() => {
    mockWebSocket = {
      onmessage: jasmine.createSpy('onmessage'),
      onclose: jasmine.createSpy('onclose'),
      close: jasmine.createSpy('close'),
      send: jasmine.createSpy('send')
    };

    spyOn(window, 'WebSocket').and.returnValue(mockWebSocket);

    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingWebsocketService);
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait établir une connexion WebSocket à la création', () => {
    expect(WebSocket).toHaveBeenCalledWith(`${environment.WEBSOCKET_URL}/cable`);
  });

  it("devrait mettre à jour bookingUpdates lorsqu'un message booking_update est reçu", (done) => {
    const testBookingData = { type: 'booking_update', booking: { id: 1, status: 'confirmé' } };
    
    service.getBookingUpdates().subscribe((data) => {
      if (data) {
        expect(data).toEqual(testBookingData.booking);
        done();
      }
    });

    mockWebSocket.onmessage({ data: JSON.stringify(testBookingData) });
  });

  it('devrait tenter une reconnexion lorsque WebSocket se ferme', (done) => {
    spyOn(service as any, 'connectWebSocket');
    
    mockWebSocket.onclose();
    
    setTimeout(() => {
      expect((service as any).connectWebSocket).toHaveBeenCalled();
      done();
    }, 3100);
  });
});
