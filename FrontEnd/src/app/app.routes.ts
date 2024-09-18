import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path: "", component: LandingPageComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "login", component: LoginComponent },
    { path: "forgotPassword", component: ForgotPasswordComponent },
    { path: "**", component: ErrorComponent }
];
