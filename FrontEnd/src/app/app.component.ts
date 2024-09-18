import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RegisterationComponent,
    HeaderComponent,
    LandingPageComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
