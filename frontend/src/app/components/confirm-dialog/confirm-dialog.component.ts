import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog', // Définit le sélecteur HTML du composant : <app-confirm-dialog></app-confirm-dialog>
  standalone: true, // Indique que ce composant peut être utilisé indépendamment, sans faire partie d'un module
  imports: [CommonModule], // Importe les fonctionnalités Angular de base pour le template
  template: `
    <div class="dialog-overlay" *ngIf="isOpen"> <!-- Affiche la boîte de dialogue si isOpen est vrai -->
      <div class="dialog-content">
        <h3>{{ title }}</h3> <!-- Affiche le titre de la boîte de dialogue -->
        <p>{{ message }}</p> <!-- Affiche le message -->
        <div class="dialog-actions">
          <button (click)="confirm()">Yes</button> <!-- Bouton de confirmation -->
          <button (click)="cancel()">No</button> <!-- Bouton d'annulation -->
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirm-dialog.component.scss'], // Fichier de styles associé pour le design
})
export class ConfirmDialogComponent {
  @Input() isOpen = false; // Propriété permettant d'afficher ou masquer la boîte de dialogue
  @Input() title = 'Confirm Action'; // Titre par défaut de la boîte de dialogue
  @Input() message = 'Are you sure you want to proceed?'; // Message par défaut
  @Output() onConfirm = new EventEmitter<void>(); // Événement déclenché lors de la confirmation
  @Output() onCancel = new EventEmitter<void>(); // Événement déclenché lors de l'annulation

  /**
   * Méthode appelée lorsqu'on clique sur "Yes".
   * - Émet un événement `onConfirm` pour informer le parent.
   * - Ferme la boîte de dialogue en mettant `isOpen` à `false`.
   */
  confirm(): void {
    this.onConfirm.emit();
    this.isOpen = false;
  }

  /**
   * Méthode appelée lorsqu'on clique sur "No".
   * - Émet un événement `onCancel` pour informer le parent.
   * - Ferme la boîte de dialogue en mettant `isOpen` à `false`.
   */
  cancel(): void {
    this.onCancel.emit();
    this.isOpen = false;
  }
}
