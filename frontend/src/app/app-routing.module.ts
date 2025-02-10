import { Routes } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { AuthGuard } from './security/auth.guard';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
];
