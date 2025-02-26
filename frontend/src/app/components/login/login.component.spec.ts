import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // 🛠️ Avant chaque test, on configure le module de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent], // Déclare le composant à tester
      imports: [ReactiveFormsModule]  // Importe ReactiveFormsModule pour utiliser les formulaires réactifs
    }).compileComponents(); // Compile les composants pour le test
  });

  // 🛠️ Avant chaque test, on instancie le composant et déclenche la détection des changements
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Applique la détection des changements Angular
  });

  // ✅ Vérifie si le composant est bien créé
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Vérifie si le formulaire contient bien les champs 'email' et 'password'
  it('should have a FormGroup with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  // ✅ Vérifie la validation du champ 'email'
  it('should require a valid email', () => {
    let emailControl = component.loginForm.get('email'); // Récupère le contrôle email du formulaire
    
    emailControl?.setValue(''); // 🛑 Cas 1 : email vide -> invalide
    expect(emailControl?.valid).toBeFalse();
    
    emailControl?.setValue('invalid-email'); // 🛑 Cas 2 : email au mauvais format -> invalide
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('test@example.com'); // ✅ Cas 3 : email correct -> valide
    expect(emailControl?.valid).toBeTrue();
  });

  // ✅ Vérifie la validation du champ 'password'
  it('should require a password of at least 6 characters', () => {
    let passwordControl = component.loginForm.get('password'); // Récupère le contrôle password

    passwordControl?.setValue(''); // 🛑 Cas 1 : mot de passe vide -> invalide
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('123'); // 🛑 Cas 2 : mot de passe trop court -> invalide
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('abcdef'); // ✅ Cas 3 : mot de passe avec 6 caractères -> valide
    expect(passwordControl?.valid).toBeTrue();
  });

  // ✅ Vérifie que la soumission du formulaire fonctionne correctement
  it('should submit the form when valid', () => {
    spyOn(console, 'log'); // 🎯 Espionne console.log pour vérifier s'il est bien appelé

    // 📝 Remplit le formulaire avec des valeurs valides
    component.loginForm.setValue({ email: 'test@example.com', password: 'abcdef' });
    
    component.onSubmit(); // ⏩ Simule la soumission du formulaire

    // ✅ Vérifie que console.log a bien été appelé avec les bonnes valeurs
    expect(console.log).toHaveBeenCalledWith('Form Submitted!', { email: 'test@example.com', password: 'abcdef' });
  });
});
