import { Routes } from '@angular/router';
import { RegisterationComponent } from './components/registeration/registeration.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    { path: "", component: RegisterationComponent },
    { path: "registeration", component: RegisterationComponent },
    { path: "login", component: LoginComponent },
    { path: "**", component: ErrorComponent }
];
