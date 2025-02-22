import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const config: SocketIoConfig = { url: 'http://localhost:3000/cable', options: {} };

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(SocketIoModule.forRoot(config))
    // New HttpClient setup
  ],
  
}).catch((err) => console.error(err));
