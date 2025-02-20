import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { TableComponent } from '../../table/table/table.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClientModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    FormsModule,
    ClientModalComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  clients: Client[] = [];
  defaultClient: Client = {
    id: '0',
    name: '',
    phone_number: '',
    email: '',
    address: '',
  };
  selectedClient: Client = this.defaultClient;
  isModalOpen = false;
  modalMode: 'create' | 'edit' = 'create';
  clientToDelete: Client | null = null;
  isConfirmDialogOpen = false;



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
      handler: (client: Client) => this.openDeleteConfirmDialog(client),
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
    this.selectedClient = { ...this.defaultClient };
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
      this.clientService.updateClient(client.email, client).subscribe({
        next: () => {
          this.clients = this.clients.map((c) =>
            c.id === client.id ? client : c
          );
        },
        error: (error) => {
          console.error('Error updating client:', error);
        },
      });
    }
    this.closeClientModal();
  }

  // Open custom confirm dialog for client deletion
  openDeleteConfirmDialog(client: Client): void {
    this.clientToDelete = client;
    this.isConfirmDialogOpen = true;
  }

  confirmDelete(): void {
    if (this.clientToDelete) {
      this.clientService.deleteClient(this.clientToDelete.email).subscribe({
        next: () => {
          this.clients = this.clients.filter(
            (c) => c.id !== this.clientToDelete?.id
          );
          this.clientToDelete = null;
          this.isConfirmDialogOpen = false;
        },
        error: (error) => {
          console.error('Error deleting client:', error);
        },
      });
    }
  }

  cancelDelete(): void {
    this.isConfirmDialogOpen = false;
    this.clientToDelete = null;
  }
}
