import { Routes } from '@angular/router';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    { path: "", component:  LandingPageComponent },
    { path: "registeration", component: RegisterationComponent },
    { path: "login", component: LoginComponent },
    // { path: "login", component: LandingPageComponent },
    { path: "**", component: ErrorComponent }
];
