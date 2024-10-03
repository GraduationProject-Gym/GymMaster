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
import { AddClassComponent } from './components/trainer/add-class/add-class.component';
import { TraineesComponent } from './components/trainer/trainees/trainees.component';
import { ReportComponent } from './components/trainer/report/report.component';
import { GoalComponent } from './components/trainee/goal/goal.component';
import { MembershipComponent } from './components/trainee/membership/membership.component';
import { EditProfileComponent } from './components/trainee/edit-profile/edit-profile.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification/email-verification.component';
import { TraineeAllClassesComponent } from './components/trainee/trainee-all-classes/trainee-all-classes.component';
import { TraineeMyClassesComponent } from './components/trainee/trainee-my-classes/trainee-my-classes.component';
import { DoReviewComponent } from './components/trainee/do-review/do-review.component';
import { ShowReviewComponent } from './components/trainee/show-review/show-review.component';
import { AttendanceComponent } from './components/trainee/attendance/attendance.component';
import { ShowReportComponent } from './components/trainee/show-report/show-report.component';
import { AllTrainersComponent } from './components/admin/all-trainers/all-trainers.component';
import { AddTrainerComponent } from './components/admin/add-trainer/add-trainer.component';
import { AllTraineesComponent } from './components/admin/all-trainees/all-trainees.component';
import { MoreDetailsTraineeComponent } from './components/admin/more-details-trainee/more-details-trainee.component';
import { AdminAllClassesComponent } from './components/admin/admin-all-classes/admin-all-classes.component';
import { AdminEditClassComponent } from './components/admin/admin-edit-class/admin-edit-class.component';


export const routes: Routes = [
    {path: "", component: LandingPageComponent },
    {path: "home", component: LandingPageComponent },
    { path: "registration", component: RegistrationComponent },
    { path: "login", component: LoginComponent },
    { path: "forgotPassword", component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'email-verification', component: EmailVerificationComponent },
    { path: "trainer/classes", component: ClassesComponent },
    { path: 'trainer/update-class', component: UpdateClassComponent },
    { path: 'trainer/add-class', component: AddClassComponent },
    { path: 'trainer/trainees', component: TraineesComponent },
    { path: 'trainer/trainees/create-report', component:ReportComponent},
    { path: "trainee", component: TraineeComponent },
    { path: 'trainee-profile', component:TraineeComponent},
    { path: 'trainee-goal', component:GoalComponent},
    { path: 'trainee-membership', component:MembershipComponent},
    { path: 'trainee-profile/edit', component:EditProfileComponent},
    { path: 'trainee-myClasses', component:TraineeMyClassesComponent},
    { path: 'trainee-allClasses', component:TraineeAllClassesComponent},
    { path: 'trainee-doReview', component:DoReviewComponent},
    { path: 'trainee-showReviews', component:ShowReviewComponent},
    { path: 'trainee-attendance', component:AttendanceComponent},
    { path: 'trainee-showReport', component:ShowReportComponent},
    { path: 'admin-trainers', component:AllTrainersComponent},
    { path: 'admin-addTrainer', component:AddTrainerComponent},
    { path: 'admin-trainees', component:AllTraineesComponent},
    // { path: 'admin/trainee-moreDetials', component:MoreDetailsTraineeComponent},
    { path: 'admin-trainee/:id', component: MoreDetailsTraineeComponent },
    { path: 'admin-allClasses', component: AdminAllClassesComponent },
    { path: 'admin-editClass/:classId', component: AdminEditClassComponent },

    { path: "**", component: ErrorComponent }
];

