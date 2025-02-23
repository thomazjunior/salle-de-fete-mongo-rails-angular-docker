import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientActionsDirective } from '../../services/client.directive';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, ClientActionsDirective],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => (this.clients = data),
      error: (error) => console.error('Error fetching clients:', error),
    });
  }

  handleClientUpdate(updatedClient: Client): void {
    this.clients = this.clients.map((c) =>
      c.id === updatedClient.id ? updatedClient : c
    );
  }

  handleClientDelete(clientId: string): void {
    this.clients = this.clients.filter((c) => c.id !== clientId);
  }
}
