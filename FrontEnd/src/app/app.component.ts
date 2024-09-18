import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './components/login/login.component';
=======
import { RegisterationComponent } from './components/registeration/registeration.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';


>>>>>>> fa66a01e60239dab165060cbb3823075e233fb97

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
<<<<<<< HEAD
    LoginComponent
=======
    RegisterationComponent,
    HeaderComponent,
    LandingPageComponent,

>>>>>>> fa66a01e60239dab165060cbb3823075e233fb97
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
