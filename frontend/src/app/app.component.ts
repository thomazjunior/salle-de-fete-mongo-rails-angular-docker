import { Component } from '@angular/core';
import { ScriptLoaderService } from './services/script-loader.service';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  constructor(private scriptLoader: ScriptLoaderService) {
    this.loadExternalScripts();
  }

  private loadExternalScripts() {
    this.scriptLoader.loadMultipleScripts([
      'https://code.jquery.com/jquery-3.4.1.min.js',
      'assets/lib/wow/wow.min.js',
      'assets/lib/owlcarousel/owl.carousel.min.js',
      'assets/js/main.js',
    ]);
  }
}
