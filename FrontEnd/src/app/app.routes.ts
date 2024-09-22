import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ClassesComponent } from './components/trainer/classes/classes.component';
import { UpdateClassComponent } from './components/trainer/update-class/update-class.component';
import { ShowClassComponent } from './components/trainer/show-class/show-class.component';


export const routes: Routes = [
    {path: "", component: LandingPageComponent },
    {path: "home", component: LandingPageComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "login", component: LoginComponent },
    { path: "forgotPassword", component: ForgotPasswordComponent },
    { path: "trainer/classes", component: ClassesComponent },
    // { path: "trainer/Trainees", component: TraineesComponent },
    { path: 'trainer/update-class', component: UpdateClassComponent },
    { path: 'trainer/show-class', component: ShowClassComponent },
    { path: "**", component: ErrorComponent }
];


