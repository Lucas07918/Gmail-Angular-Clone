import { Component } from '@angular/core';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EmailsComponent } from './components/emails/emails.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    SideBarComponent,
    EmailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'email-angular-website';
}
