import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login', // Définit le sélecteur HTML du composant : <app-login></app-login>
  templateUrl: './login.component.html', // Fichier HTML contenant le formulaire de connexion
  styleUrls: ['./login.component.scss'] // Fichier SCSS pour le style du composant
})
export class LoginComponent {
  loginForm: FormGroup; // Déclaration du formulaire de connexion

  /**
   * Constructeur du composant.
   * - Injecte `FormBuilder` pour simplifier la création de formulaires réactifs.
   * - Initialise `loginForm` avec deux champs : `email` et `password`.
   */
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Champ email obligatoire avec validation du format
      password: ['', [Validators.required, Validators.minLength(6)]] // Champ mot de passe obligatoire avec min 6 caractères
    });
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * - Vérifie si le formulaire est valide avant d'exécuter l'action.
   * - Affiche les valeurs du formulaire dans la console.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
    }
  }
}
