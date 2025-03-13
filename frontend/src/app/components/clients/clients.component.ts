import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientActionsDirective } from '../../services/client.directive';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-clients', // Définit le sélecteur HTML pour utiliser ce composant : <app-clients></app-clients>
  standalone: true, // Indique que ce composant peut être utilisé sans être dans un module
  imports: [CommonModule, ClientActionsDirective], // Importe des modules et directives nécessaires pour le composant
  templateUrl: './clients.component.html', // Fichier HTML externe contenant la structure de l'interface utilisateur
  styleUrls: ['./clients.component.scss'], // Fichier SCSS externe pour les styles du composant
})
export class ClientsComponent implements OnInit {
  clients: Client[] = []; // Tableau contenant la liste des clients récupérés depuis le service

  constructor(private clientService: ClientService) {} // Injection du service ClientService pour communiquer avec l’API

  /**
   * Lifecycle hook ngOnInit : appelé automatiquement après l'initialisation du composant.
   * Ici, on récupère la liste des clients dès que le composant est chargé.
   */
  ngOnInit(): void {
    this.fetchClients();
  }

  /**
   * Récupère la liste des clients via le service.
   * Utilise RxJS `subscribe` pour gérer la réponse asynchrone.
   */
  fetchClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => (this.clients = data), // Met à jour la liste des clients avec les données reçues
      error: (error) => console.error('Erreur lors de la récupération des clients :', error), // Affiche une erreur en cas d'échec
    });
  }

  /**
   * Met à jour un client spécifique dans la liste.
   * Remplace l'ancien objet client par le nouveau mis à jour.
   */
  handleClientUpdate(updatedClient: Client): void {
    this.clients = this.clients.map((c) =>
      c.id === updatedClient.id ? updatedClient : c
    );
  }

  /**
   * Supprime un client de la liste en fonction de son ID.
   * Utilise `filter` pour créer une nouvelle liste sans le client supprimé.
   */
  handleClientDelete(clientId: string): void {
    this.clients = this.clients.filter((c) => c.id !== clientId);
  }
}
