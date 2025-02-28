import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environment';
import { Reservation, ServiceReservation } from './booking.service';

describe('ServiceReservation', () => {
  let service: ServiceReservation;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceReservation]
    });

    service = TestBed.inject(ServiceReservation);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer toutes les réservations', () => {
    const mockReservations: Reservation[] = [
      {
        id: '1',
        date: '2024-02-27',
        heure_debut: '10:00',
        heure_fin: '12:00',
        nombre_invites: 4,
        statut: 1,
        valeur_totale: 200,
        client_id: 'C123',
        forfait_id: 'F456'
      }
    ];

    service.obtenirReservations().subscribe(reservations => {
      expect(reservations.length).toBe(1);
      expect(reservations).toEqual(mockReservations);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reservations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservations);
  });

  it('devrait récupérer une réservation par ID', () => {
    const mockReservation: Reservation = {
      id: '1',
      date: '2024-02-27',
      heure_debut: '10:00',
      heure_fin: '12:00',
      nombre_invites: 4,
      statut: 1,
      valeur_totale: 200,
      client_id: 'C123',
      forfait_id: 'F456'
    };

    service.obtenirReservationParId('1').subscribe(reservation => {
      expect(reservation).toEqual(mockReservation);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reservations/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReservation);
  });

  it('devrait créer une réservation', () => {
    const newReservation: Reservation = {
      id: '2',
      date: '2024-02-28',
      heure_debut: '14:00',
      heure_fin: '16:00',
      nombre_invites: 2,
      statut: 1,
      valeur_totale: 100,
      client_id: 'C124',
      forfait_id: 'F457'
    };

    service.creerReservation(newReservation).subscribe(reservation => {
      expect(reservation).toEqual(newReservation);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reservations`);
    expect(req.request.method).toBe('POST');
    req.flush(newReservation);
  });

  it('devrait mettre à jour une réservation', () => {
    const updatedReservation: Partial<Reservation> = {
      nombre_invites: 5
    };

    service.mettreAJourReservation('1', updatedReservation).subscribe(reservation => {
      expect(reservation.nombre_invites).toBe(5);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reservations/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...updatedReservation, id: '1' });
  });

  it('devrait supprimer une réservation', () => {
    service.supprimerReservation('1').subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reservations/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
