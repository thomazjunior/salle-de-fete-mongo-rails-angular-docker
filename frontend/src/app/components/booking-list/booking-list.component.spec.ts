import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookingWebsocketService } from '../../services/booking-websocket.service';
import { BookingListComponent } from './booking-list.component';

describe('BookingListComponent', () => {
  let component: BookingListComponent; // Instance du composant testé
  let fixture: ComponentFixture<BookingListComponent>; // Permet d'accéder au DOM et aux méthodes du composant
  let bookingWebsocketServiceSpy: jasmine.SpyObj<BookingWebsocketService>; // Mock du service WebSocket

  beforeEach(async () => {
    // Création d'un service simulé (mock) avec Jasmine
    bookingWebsocketServiceSpy = jasmine.createSpyObj('BookingWebsocketService', ['getBookingUpdates']);

    // Configuration du module de test Angular
    await TestBed.configureTestingModule({
      imports: [BookingListComponent], // Déclare le composant testé
      providers: [
        { provide: BookingWebsocketService, useValue: bookingWebsocketServiceSpy } // Injecte le service mocké
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListComponent); // Création d'une instance du composant
    component = fixture.componentInstance; // Récupération du composant
  });

  it('DOIT ajouter une réservation si elle est nouvelle', () => {
    // ÉTANT DONNÉ une nouvelle réservation
    const newBooking = { id: 1, name: 'Réservation 1' };

    // Simulation de la réception d'une mise à jour WebSocket avec une nouvelle réservation
    bookingWebsocketServiceSpy.getBookingUpdates.and.returnValue(of(newBooking));

    // QUAND le composant est initialisé
    component.ngOnInit();

    // ALORS la réservation doit être ajoutée à la liste
    expect(component.bookings.length).toBe(1); // Vérifie qu'une réservation a été ajoutée
    expect(component.bookings[0]).toEqual(newBooking); // Vérifie que la réservation est bien celle reçue
  });

  it('DOIT mettre à jour une réservation existante', () => {
    // ÉTANT DONNÉ une réservation existante dans la liste
    const existingBooking = { id: 1, name: 'Ancienne Réservation' };
    component.bookings.push(existingBooking); // Ajout manuel d'une réservation existante

    // ET une mise à jour de cette réservation reçue par WebSocket
    const updatedBooking = { id: 1, name: 'Nouvelle Réservation' };
    bookingWebsocketServiceSpy.getBookingUpdates.and.returnValue(of(updatedBooking));

    // QUAND le composant est initialisé
    component.ngOnInit();

    // ALORS la réservation doit être mise à jour (et non dupliquée)
    expect(component.bookings.length).toBe(1); // Vérifie qu'il n'y a pas de doublon
    expect(component.bookings[0]).toEqual(updatedBooking); // Vérifie que la réservation a bien été mise à jour
  });
});
