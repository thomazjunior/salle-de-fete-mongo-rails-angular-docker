import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';

@Component({
  selector: 'app-host-component',
  template: '<app-table [rows]="rows" [columns]="columns" [actions]="actions"></app-table>'
})
class HostComponent {
  rows = [{ id: 1, name: 'Test' }];
  columns = [
    { displayName: 'ID', backendName: 'id' },
    { displayName: 'Nom', backendName: 'name' }
  ];
  actions = [
    { label: 'Modifier', handler: () => {}, type: 'edit', icon: 'edit_icon' },
    { label: 'Supprimer', handler: () => {}, type: 'delete', icon: 'delete_icon' }
  ];
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, HostComponent],
      imports: [CommonModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait avoir des lignes, colonnes et actions vides par défaut', () => {
    expect(component.rows).toEqual([]);
    expect(component.columns).toEqual([]);
    expect(component.actions).toEqual([]);
  });

  it('devrait retourner la bonne classe de bouton en fonction du type d\'action', () => {
    expect(component.getButtonClass({ label: 'Modifier', type: 'edit' })).toBe('edit-button');
    expect(component.getButtonClass({ label: 'Supprimer', type: 'delete' })).toBe('delete-button');
    expect(component.getButtonClass({ label: 'Autre', type: 'other' })).toBe('');
  });
});
