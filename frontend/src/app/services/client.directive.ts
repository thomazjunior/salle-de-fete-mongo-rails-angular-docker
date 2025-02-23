import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Client } from '../models/client.model';
import { ClientService } from './client.service';


@Directive({
  selector: '[appClientActions]',
})
export class ClientActionsDirective {
  @Input() client!: Client;
  @Output() clientUpdated = new EventEmitter<Client>();
  @Output() clientDeleted = new EventEmitter<string>();

  constructor(private clientService: ClientService, private el: ElementRef) {}

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if (target.classList.contains('edit-client')) {
      this.openEditClientModal();
    } else if (target.classList.contains('delete-client')) {
      this.openDeleteConfirmDialog();
    }
  }

  openEditClientModal(): void {
    if (this.client.id == null) return;
    this.clientService.updateClient(this.client.id, this.client).subscribe({
      next: (updatedClient) => this.clientUpdated.emit(updatedClient),
      error: (error) => console.error('Error updating client:', error),
    });
  }

  openDeleteConfirmDialog(): void {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${this.client.name}?`
    );
    if (confirmDelete) {
      if (this.client.id == null) return;
      this.clientService.deleteClient(this.client.id).subscribe({
        next: () => this.clientDeleted.emit(this.client.id),
        error: (error) => console.error('Error deleting client:', error),
      });
    }
  }
}
