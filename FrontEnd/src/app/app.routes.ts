import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { TraineeComponent } from './components/trainee/profile/trainee.component';
import { ClassesComponent } from './components/trainer/classes/classes.component';
import { UpdateClassComponent } from './components/trainer/update-class/update-class.component';
import { ShowClassComponent } from './components/trainer/show-class/show-class.component';
import { AddClassComponent } from './components/trainer/add-class/add-class.component';
import { TraineesComponent } from './components/trainer/trainees/trainees.component';
import { ReportComponent } from './components/trainer/report/report.component';
import { GoalComponent } from './components/trainee/goal/goal.component';
import { MembershipComponent } from './components/trainee/membership/membership.component';
import { EditProfileComponent } from './components/trainee/edit-profile/edit-profile.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification/email-verification.component';


export const routes: Routes = [
    {path: "", component: LandingPageComponent },
    {path: "home", component: LandingPageComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "login", component: LoginComponent },
    { path: "forgotPassword", component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'email-verification', component: EmailVerificationComponent },
    { path: "trainee", component: TraineeComponent },
    { path: "trainer/classes", component: ClassesComponent },
    { path: 'trainer/update-class', component: UpdateClassComponent },
    { path: 'trainer/show-class', component: ShowClassComponent },
    { path: 'trainer/add-class', component: AddClassComponent },
    { path: 'trainer/trainees', component: TraineesComponent },
    { path: 'trainer/trainees/create-report', component:ReportComponent},
    { path: 'trainee-profile', component:TraineeComponent},
    { path: 'trainee-goal', component:GoalComponent},
    { path: 'trainee-membership', component:MembershipComponent},
    { path: 'trainee-profile/edit', component:EditProfileComponent},

    { path: "**", component: ErrorComponent }
];

