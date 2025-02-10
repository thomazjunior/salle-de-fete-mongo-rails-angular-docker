import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { TableComponent } from '../../table/table/table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  topClients: Client[] = [];
  searchQuery: string = '';

  columns = [
    { displayName: 'Nome', backendName: 'name', width: '200px' },
    { displayName: 'Celular', backendName: 'phone_number', width: '200px' },
    { displayName: 'Endereço', backendName: 'address', width: '200px' },
    { displayName: 'Sexo', backendName: 'sex', width: '10px' },
    { displayName: 'Primeiro', backendName: 'firstBookingDate', width: '10px' },
    { displayName: 'Próximo', backendName: 'nextBookingDate', width: '10px' },
    {
      displayName: 'Quantidade',
      backendName: 'numberOfBookings',
      width: '10px',
    },
    { displayName: 'Soma', backendName: 'totalValueOfBooks', width: '10px' },
  ];

  actions = [
    { label: 'Edit', handler: () => {}, type: 'edit', icon: '✏️' },
    { label: 'Delete', handler: () => {}, type: 'delete', icon: '❌' },
  ];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  // Fetch all clients
  fetchClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log('Fechted clients:', this.clients);
        this.fetchTopClients(); // Populate top clients when clients are fetched
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  // Fetch top clients based on specific logic (e.g., based on the number of books ordered)
  fetchTopClients(): void {
    this.topClients = this.clients.filter((client) => true); //TODO: implement this logic
  }

  // Search clients based on name or other fields
  onSearch(event: any): void {
    this.searchQuery = event.target.value.toLowerCase();
    this.filterClients();
  }

  // Filter clients based on the search query
  filterClients(): void {
    this.clients = this.clients.filter(
      (client) =>
        client.name.toLowerCase().includes(this.searchQuery) ||
        client.email.toLowerCase().includes(this.searchQuery)
    );
  }

  // Add client (can open a modal for adding client, or call a service to open modal)
  openCreateClientModal(): void {
    // Logic for opening a modal goes here (You can use Angular Material dialog or custom modal)
    console.log('Opening client creation modal...');
  }

  // Edit client details (you can create a modal for editing)
  editClient(client: Client): void {
    console.log('Editing client:', client);
    // Implement edit logic
  }

  // Delete a client
  deleteClient(clientId: string): void {
    this.clientService.deleteClient(clientId).subscribe({
      next: () => {
        console.log('Client deleted successfully');
        this.fetchClients(); // Refresh the clients list
      },
      error: (error) => {
        console.error('Error deleting client:', error);
      },
    });
  }
}
