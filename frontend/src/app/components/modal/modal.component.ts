import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-modal', // Définit le sélecteur HTML du composant : <app-client-modal></app-client-modal>
  standalone: true, // Indique que ce composant peut être utilisé indépendamment sans module spécifique
  imports: [CommonModule, FormsModule], // Importe les modules nécessaires, notamment FormsModule pour la gestion des formulaires
  templateUrl: './modal.component.html', // Fichier HTML du modal
  styleUrls: ['./modal.component.scss'], // Fichier SCSS pour le style du modal
})
export class ClientModalComponent {
  /**
   * `@Input()` permet de recevoir des données du composant parent.
   * - `isOpen` : contrôle l'affichage du modal (true = visible, false = caché).
   * - `client` : objet contenant les informations du client (nom, email, téléphone, adresse).
   * - `mode` : détermine si le modal est utilisé pour créer un client ou modifier un client existant.
   */
  @Input() isOpen: boolean = false;
  @Input() client: Client = {
    name: '',
    email: '',
    phone_number: '',
    address: ''
  };
  @Input() mode: 'create' | 'edit' = 'create';

  /**
   * `@Output()` permet d'envoyer des événements au composant parent.
   * - `onClose` : émet un événement lorsque l'utilisateur ferme le modal.
   * - `onSave` : émet l'objet `Client` mis à jour lorsque l'utilisateur sauvegarde les modifications.
   */
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Client>();

  /**
   * Ferme la fenêtre modale et informe le composant parent via `onClose.emit()`.
   */
  closeModal(): void {
    this.onClose.emit();
  }

  /**
   * Enregistre le client et envoie les données mises à jour au composant parent via `onSave.emit(this.client)`.
   */
  saveClient(): void {
    this.onSave.emit(this.client);
  }
}
