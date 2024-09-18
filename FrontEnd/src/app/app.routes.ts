import { Routes } from '@angular/router';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
<<<<<<< HEAD
=======
import { LandingPageComponent } from './components/landing-page/landing-page.component';
>>>>>>> fa66a01e60239dab165060cbb3823075e233fb97

export const routes: Routes = [
    { path: "", component:  LandingPageComponent },
    { path: "registeration", component: RegisterationComponent },
    { path: "login", component: LoginComponent },
    // { path: "login", component: LandingPageComponent },
    { path: "**", component: ErrorComponent }
];
