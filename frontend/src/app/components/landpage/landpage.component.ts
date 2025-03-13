import { Component } from '@angular/core';
import { ScriptLoaderService } from '../../services/script-loader.service';

@Component({
  selector: 'app-landpage', // Définit le sélecteur HTML du composant : <app-landpage></app-landpage>
  standalone: true, // Indique que ce composant est autonome et ne dépend pas d'un module Angular spécifique
  imports: [], // Liste des imports de modules Angular (vide ici car aucun module supplémentaire n'est requis)
  templateUrl: './landpage.component.html', // Fichier HTML associé au composant
  styleUrl: './landpage.component.scss', // Fichier SCSS pour le style du composant
})
export class LandpageComponent {
  /**
   * Constructeur du composant.
   * - Injecte le `ScriptLoaderService`, un service qui permet de charger des scripts dynamiquement.
   * - Appelle immédiatement la méthode `loadExternalScripts()` pour charger les fichiers JS nécessaires.
   */
  constructor(private scriptLoader: ScriptLoaderService) {
    this.loadExternalScripts();
  }

  /**
   * Charge plusieurs scripts externes (jQuery, WOW.js, Owl Carousel, et un script personnalisé).
   * - `loadMultipleScripts()` est une méthode du service `ScriptLoaderService` qui ajoute ces scripts au document HTML.
   */
  private loadExternalScripts() {
    this.scriptLoader.loadMultipleScripts([
      'https://code.jquery.com/jquery-3.4.1.min.js', // jQuery (version 3.4.1)
      'assets/lib/wow/wow.min.js', // Effets d'animation WOW.js
      'assets/lib/owlcarousel/owl.carousel.min.js', // Plugin Owl Carousel pour les carrousels d'images
      'assets/js/main.js', // Script personnalisé pour la page d'atterrissage
    ]);
  }
}
