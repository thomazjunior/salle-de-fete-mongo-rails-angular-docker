import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ClientModalComponent {
  @Input() isOpen: boolean = false;
  @Input() client: Client = {
    name: '',
    email: '',
    phone_number: '',
    address: ''
  };
  @Input() mode: 'create' | 'edit' = 'create';
  
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Client>();

  closeModal(): void {
    this.onClose.emit();
  }

  saveClient(): void {
    this.onSave.emit(this.client);
  }
}
