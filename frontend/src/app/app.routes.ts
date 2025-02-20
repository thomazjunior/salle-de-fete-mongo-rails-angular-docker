import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { LandpageComponent } from './components/landpage/landpage.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './security/auth.guard';

export const routes: Routes = [
  { path: '', component: LandpageComponent }, // Display Landpage at root
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/clients' },
  { path: 'login', component: LoginComponent },// Redirect unknown routes to root
];
