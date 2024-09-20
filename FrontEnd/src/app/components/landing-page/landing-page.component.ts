import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RegistrationComponent } from '../registration/registration.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent,
    RegistrationComponent,
    RouterModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}

