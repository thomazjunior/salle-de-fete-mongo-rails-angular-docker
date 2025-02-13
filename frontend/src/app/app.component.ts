import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandpageComponent } from './components/landpage/landpage.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandpageComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
}
