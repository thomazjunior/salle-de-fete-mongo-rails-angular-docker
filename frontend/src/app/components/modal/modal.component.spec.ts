import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { Client } from '../../models/client.model';
import { ClientModalComponent } from './modal.component';

// 🐐 Décrire le bloc principal du test pour le composant ClientModalComponent
// Ce bloc englobe tous les tests liés au modal
// On s'assure que le composant fonctionne comme attendu dans divers scénarios
describe('ClientModalComponent', () => {
  let component: ClientModalComponent;
  let fixture: ComponentFixture<ClientModalComponent>;

  // 🐐 Initialiser le module de test et créer l'instance du composant
  // Avant chaque test, nous configurons l'environnement et compilons les composants nécessaires
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Importation du module FormsModule pour gérer les formulaires
      declarations: [ClientModalComponent] // Déclaration du composant testé
    }).compileComponents(); // Compilation des composants avant exécution des tests
  });

  // 🐐 Création du composant avant chaque test pour obtenir une instance propre
  beforeEach(() => {
    fixture = TestBed.createComponent(ClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Déclenchement de la détection des changements
  });

  // 🐐 Vérifier si le composant est correctement créé
  it('devrait créer le composant', () => {
    expect(component).toBeTruthy(); // Vérification que l'instance du composant existe
  });

  // 🐐 Tester si le modal s'affiche uniquement lorsque isOpen est vrai
  it("devrait afficher le modal lorsque 'isOpen' est true", () => {
    component.isOpen = true; // Activation du modal
    fixture.detectChanges(); // Mise à jour de l'affichage
    const modalElement = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modalElement).toBeTruthy(); // Vérification que l'élément modal existe dans le DOM
  });

  // 🐐 Vérifier si le titre change en fonction du mode
  it("devrait afficher 'Create New Client' lorsque le mode est 'create'", () => {
    component.mode = 'create'; // Mode création
    fixture.detectChanges(); // Mise à jour de l'affichage
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(title.textContent).toContain('Create New Client'); // Vérification du titre affiché
  });

  // 🐐 Vérifier si le titre change pour 'Edit Client' lorsque le mode est édition
  it("devrait afficher 'Edit Client' lorsque le mode est 'edit'", () => {
    component.mode = 'edit'; // Mode édition
    fixture.detectChanges(); // Mise à jour de l'affichage
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(title.textContent).toContain('Edit Client'); // Vérification du titre affiché
  });

  // 🐐 Tester si les valeurs du formulaire sont bien liées aux propriétés du client
  it("devrait synchroniser les entrées du formulaire avec l'objet client", () => {
    const testClient: Client = {
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      phone_number: '0123456789',
      address: '123 Rue de Paris'
    };
    component.client = testClient; // Attribution des données du client
    fixture.detectChanges(); // Mise à jour de l'affichage

    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    expect(nameInput.value).toBe(testClient.name); // Vérification de la liaison entre le modèle et l'input
  });

  // 🐐 Vérifier si l'événement onSave est bien déclenché avec les bonnes données
  it("devrait émettre l'événement onSave avec le client mis à jour", () => {
    spyOn(component.onSave, 'emit'); // Espionner l'événement onSave
    component.client.name = 'Marie Curie'; // Modifier une valeur du client
    component.saveClient(); // Sauvegarde du client
    expect(component.onSave.emit).toHaveBeenCalledWith(component.client); // Vérification de l'émission correcte de l'événement
  });

  // 🐐 Vérifier si l'événement onClose est bien déclenché lors de la fermeture du modal
  it("devrait émettre l'événement onClose lorsqu'on ferme le modal", () => {
    spyOn(component.onClose, 'emit'); // Espionner l'événement onClose
    component.closeModal(); // Fermeture du modal
    expect(component.onClose.emit).toHaveBeenCalled(); // Vérification que l'événement onClose a bien été émis
  });
});
