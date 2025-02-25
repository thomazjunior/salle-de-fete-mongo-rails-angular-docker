import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientActionsDirective } from '../../services/client.directive';
import { ClientService } from '../../services/client.service';
import { ClientsComponent } from './clients.component';

describe('ClientsComponent', () => {
  let component: ClientsComponent; // Instance du composant testé
  let fixture: ComponentFixture<ClientsComponent>; // Permet d'accéder au DOM et aux méthodes du composant
  let clientServiceSpy: jasmine.SpyObj<ClientService>; // Mock du service Client

  beforeEach(async () => {
    // Création d'un mock pour ClientService
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['getClients']);

    // Configuration du module de test Angular
    await TestBed.configureTestingModule({
      imports: [CommonModule, ClientActionsDirective], // Importe les dépendances nécessaires
      declarations: [ClientsComponent], // Déclare le composant testé
      providers: [
        { provide: ClientService, useValue: clientServiceSpy } // Injecte le service mocké
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent); // Création du composant
    component = fixture.componentInstance; // Récupération de l’instance
  });

  it('DOIT récupérer la liste des clients à l’initialisation', () => {
    // ÉTANT DONNÉ une liste de clients
    const mockClients: Client[] = [
      { id: '1', name: 'Client 1', phone_number: '123', email: '', address: ''},
      { id: '2', name: 'Client 2', phone_number: '', email: '', address: ''}
    ];

    // Simulation d'une réponse réussie du service ClientService
    clientServiceSpy.getClients.and.returnValue(of(mockClients));

    // QUAND le composant est initialisé
    component.ngOnInit();

    // ALORS la liste des clients doit être mise à jour
    expect(component.clients.length).toBe(2);
    expect(component.clients).toEqual(mockClients);
  });

  it('DOIT gérer une erreur lors de la récupération des clients', () => {
    // Simulation d'une erreur côté service
    clientServiceSpy.getClients.and.returnValue(throwError(() => new Error('Erreur réseau')));

    // Espionne la console pour vérifier l'affichage de l'erreur
    spyOn(console, 'error');

    // QUAND le composant est initialisé
    component.ngOnInit();

    // ALORS une erreur doit être affichée dans la console
    expect(console.error).toHaveBeenCalledWith('Error fetching clients:', jasmine.any(Error));
  });

  it('DOIT mettre à jour un client existant', () => {
    // ÉTANT DONNÉ une liste de clients existants
    component.clients = [
      { id: '1', name: 'Ancien Client', phone_number: '', email: '', address: '' },
      { id: '2', name: 'Client 2', phone_number: '', email: '', address: '' }
    ];

    // ET une mise à jour d’un client
    const updatedClient: Client = { id: '1', name: 'Client Mis à Jour', phone_number: '', email: '', address: '' };

    // QUAND la méthode handleClientUpdate est appelée
    component.handleClientUpdate(updatedClient);

    // ALORS la liste doit être mise à jour
    expect(component.clients.find(c => c.id === '1')?.name).toBe('Client Mis à Jour');
  });

  it('DOIT supprimer un client existant', () => {
    // ÉTANT DONNÉ une liste de clients
    component.clients = [
      { id: '1', name: 'Client 1', phone_number: '', email: '', address: '' },
      { id: '2', name: 'Client 2', phone_number: '', email: '', address: '' }
    ];

    // QUAND la méthode handleClientDelete est appelée
    component.handleClientDelete('1');

    // ALORS le client doit être supprimé de la liste
    expect(component.clients.length).toBe(1);
    expect(component.clients.find(c => c.id === '1')).toBeUndefined();
  });
});
