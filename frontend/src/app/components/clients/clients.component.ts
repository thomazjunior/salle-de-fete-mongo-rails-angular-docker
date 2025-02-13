import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { TableComponent } from '../../table/table/table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, TableComponent, FormsModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = {
    name: '',
    email: '',
    phone_number: '',
    address: '',
  };
  searchQuery: string = '';
  isModalOpen: boolean = false;

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
        console.log('Fetched clients:', this.clients);
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  // Open the modal
  openCreateClientModal(): void {
    this.isModalOpen = true;
  }

  // Close the modal
  closeCreateClientModal(): void {
    this.isModalOpen = false;
  }

  // Add a new client
  addClient(): void {
    this.clientService.addClient(this.newClient).subscribe({
      next: (data) => {
        console.log('Client added:', data);
        this.clients.push(data);
        this.newClient = {
          name: '',
          email: '',
          address: '',
          phone_number: '',
        }; // Reset the form
      },
      error: (error) => {
        console.error('Error adding client:', error);
      },
    });
  }
}
