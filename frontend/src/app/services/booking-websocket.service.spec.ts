import { TestBed } from '@angular/core/testing';

import { BookingWebsocketService } from './booking-websocket.service';

describe('BookingWebsocketService', () => {
  let service: BookingWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
