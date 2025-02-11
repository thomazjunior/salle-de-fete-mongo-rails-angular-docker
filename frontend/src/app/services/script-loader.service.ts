import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptLoaderService {
  private loadedScripts: Set<string> = new Set();

  loadScript(scriptUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loadedScripts.has(scriptUrl)) {
        resolve(); // Script is already loaded
        return;
      }

      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = () => {
        this.loadedScripts.add(scriptUrl);
        resolve();
      };
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  }

  loadMultipleScripts(scripts: string[]): Promise<void[]> {
    return Promise.all(scripts.map((script) => this.loadScript(script)));
  }
}
