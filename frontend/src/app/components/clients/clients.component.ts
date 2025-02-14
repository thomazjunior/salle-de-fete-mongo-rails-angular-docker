import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { TableComponent } from '../../table/table/table.component';
import { ClientModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, TableComponent, FormsModule, ClientModalComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  defaultClient: Client = {
    id: '0',
    name: '',
    phone_number: '',
    email: '',
    address: '',
  };
  selectedClient: Client = this.defaultClient;
  isModalOpen: boolean = false;
  modalMode: 'create' | 'edit' = 'create';

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
    {
      label: 'Edit',
      handler: (client: Client) => this.openEditClientModal(client),
      type: 'edit',
      icon: '✏️',
    },
    {
      label: 'Delete',
      handler: (client: Client) => this.deleteClient(client),
      type: 'delete',
      icon: '❌',
    },
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
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  // Open the modal for creating a new client
  openCreateClientModal(): void {
    this.selectedClient = {
      name: '',
      email: '',
      phone_number: '',
      address: '',
    };
    this.modalMode = 'create';
    this.isModalOpen = true;
  }

  // Open the modal for editing a client
  openEditClientModal(client: Client): void {
    this.selectedClient = { ...client };
    this.modalMode = 'edit';
    this.isModalOpen = true;
  }

  // Close the modal
  closeClientModal(): void {
    this.isModalOpen = false;
  }

  // Save the client (Create or Edit)
  saveClient(client: Client): void {
    if (this.modalMode === 'create') {
      this.clientService.addClient(client).subscribe({
        next: (data) => {
          this.clients.push(data);
        },
        error: (error) => {
          console.error('Error adding client:', error);
        },
      });
    } else if (this.modalMode === 'edit') {
      this.clientService.updateClient('1', client).subscribe({
        next: () => {
          this.clients = this.clients.map((c) =>
            c.email === client.email ? client : c
          );
        },
        error: (error) => {
          console.error('Error updating client:', error);
        },
      });
    }
    this.closeClientModal();
  }

  // Delete client
  deleteClient(client: Client): void {
    this.clientService.deleteClient(client.email).subscribe({
      next: () => {
        this.clients = this.clients.filter((c) => c.email !== client.email);
      },
      error: (error) => {
        console.error('Error deleting client:', error);
      },
    });
  }
}
