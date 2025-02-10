import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  imports: [CommonModule],
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() rows: any[] = []; // The data to display
  @Input() columns: { displayName: string;  backendName: string; width?: string; height?: string }[] = [];
  @Input() actions: {
    label: string;
    handler: Function;
    type: string;
    icon: string;
  }[] = [];

  getButtonClass(action: { label: string; type: string }) {
    switch (action.type) {
      case 'edit':
        return 'edit-button'; // Apply edit button styles
      case 'delete':
        return 'delete-button'; // Apply delete button styles
      default:
        return '';
    }
  }
}
