import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RegisterationComponent,
    HeaderComponent,
    LandingPageComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
