
import { ElementRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Client } from '../models/client.model';
import { ClientActionsDirective } from './client.directive';
import { ClientService } from './client.service';

describe('ClientActionsDirective', () => {
  let directive: ClientActionsDirective;
  let mockClientService: jasmine.SpyObj<ClientService>;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Création de mocks pour simuler le service ClientService et l'élément DOM
    mockClientService = jasmine.createSpyObj('ClientService', ['updateClient', 'deleteClient']);
    mockElementRef = new ElementRef(document.createElement('div'));
    directive = new ClientActionsDirective(mockClientService, mockElementRef);
  });

  it('devrait créer une instance de la directive', () => {
    expect(directive).toBeTruthy(); // Vérifie que la directive est bien instanciée
  });

  it("devrait émettre l'événement clientUpdated lorsque la mise à jour est réussie", () => {
    // Création d'un client factice pour le test
    const mockClient: Client = { id: '123', name: 'Client Test', phone_number: '123', email: 'test@test.com' };
    directive.client = mockClient;
    spyOn(directive.clientUpdated, 'emit'); // Espionne l'événement pour vérifier s'il est déclenché
    mockClientService.updateClient.and.returnValue(of(mockClient)); // Simule une mise à jour réussie

    directive.openEditClientModal(); // Exécute la fonction qui met à jour le client

    expect(mockClientService.updateClient).toHaveBeenCalledWith('123', mockClient); // Vérifie que updateClient a été appelé avec les bons paramètres
    expect(directive.clientUpdated.emit).toHaveBeenCalledWith(mockClient); // Vérifie que l'événement est bien émis
  });

  it("ne devrait pas appeler updateClient si l'ID du client est null", () => {
    // Simule un client sans ID
    directive.client = { id: null, name: 'Client Test' } as Client;
    directive.openEditClientModal();
    expect(mockClientService.updateClient).not.toHaveBeenCalled(); // Vérifie que updateClient n'est pas appelé
  });

  it("devrait gérer l'erreur de updateClient", () => {
    // Simule une erreur lors de la mise à jour du client
    const mockClient: Client = { id: '123', name: 'Client Test' };
    directive.client = mockClient;
    spyOn(console, 'error'); // Espionne la console pour vérifier si l'erreur est loggée
    mockClientService.updateClient.and.returnValue(throwError(() => new Error('Erreur de mise à jour')));

    directive.openEditClientModal();

    expect(console.error).toHaveBeenCalledWith("Erreur de mise à jour du client:", jasmine.any(Error)); // Vérifie que l'erreur est bien affichée
  });

  it("devrait émettre l'événement clientDeleted lorsque la suppression est confirmée", () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simule la confirmation de suppression
    spyOn(directive.clientDeleted, 'emit'); // Espionne l'événement pour vérifier s'il est déclenché
    directive.client = { id: '123', name: 'Client Test' };
    mockClientService.deleteClient.and.returnValue(of(null)); // Simule une suppression réussie

    directive.openDeleteConfirmDialog();

    expect(mockClientService.deleteClient).toHaveBeenCalledWith('123'); // Vérifie que deleteClient a été appelé avec le bon ID
    expect(directive.clientDeleted.emit).toHaveBeenCalledWith('123'); // Vérifie que l'événement est bien émis
  });

  it("ne devrait pas appeler deleteClient si la suppression est annulée", () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simule l'annulation de la suppression
    directive.client = { id: '123', name: 'Client Test' };

    directive.openDeleteConfirmDialog();

    expect(mockClientService.deleteClient).not.toHaveBeenCalled(); // Vérifie que deleteClient n'est pas appelé
  });

  it("devrait gérer l'erreur de deleteClient", () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simule la confirmation de suppression
    spyOn(console, 'error'); // Espionne la console pour vérifier si l'erreur est loggée
    directive.client = { id: '123', name: 'Client Test' };
    mockClientService.deleteClient.and.returnValue(throwError(() => new Error('Erreur de suppression')));

    directive.openDeleteConfirmDialog();

    expect(console.error).toHaveBeenCalledWith("Erreur de suppression du client:", jasmine.any(Error)); // Vérifie que l'erreur est bien affichée
  });
});
