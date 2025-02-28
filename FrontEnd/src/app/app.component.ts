import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClassesComponent } from './components/trainer/classes/classes.component';
import { UpdateClassComponent } from './components/trainer/update-class/update-class.component';
import { AddClassComponent } from './components/trainer/add-class/add-class.component';
import { TraineesComponent } from './components/trainer/trainees/trainees.component';
import { ReportComponent } from './components/trainer/report/report.component';
import { TraineeComponent } from './components/trainee/profile/trainee.component';
import { EditProfileComponent } from './components/trainee/edit-profile/edit-profile.component';
import { TraineeAllClassesComponent } from './components/trainee/trainee-all-classes/trainee-all-classes.component';
import { ClassService } from './services/trainer/class/class.service';
import { SidebarService } from './services/trainee/sidebar/sidebar.service';
import { DoReviewComponent } from './components/trainee/do-review/do-review.component';
import { MembershipService } from './services/trainee/membership/membership.service';
import { TraineeMyClassesComponent } from './components/trainee/trainee-my-classes/trainee-my-classes.component';
import { AttendanceComponent } from './components/trainee/attendance/attendance.component';
import { ShowReviewComponent } from './components/trainee/show-review/show-review.component';
import { ShowReportComponent } from './components/trainee/show-report/show-report.component';
import { AddTrainerComponent } from './components/admin/add-trainer/add-trainer.component';
import { AllTraineesComponent } from './components/admin/all-trainees/all-trainees.component';
import { MoreDetailsTraineeComponent } from './components/admin/more-details-trainee/more-details-trainee.component';
import { AdminAddClassComponent } from './components/admin/admin-add-class/admin-add-class.component';
import { LoginService } from './services/authentication/login/login.service';
import { PaymentVerifyComponent } from './components/trainee/payment-verify/payment-verify.component';
import { ClassesService } from './services/trainee/classes/classes.service';
import { AllEquipmentsComponent } from './components/admin/all-equipments/all-equipments.component'; // تأكد من صحة المسار
import { AllExersiseComponent } from './components/admin/all-exersise/all-exersise.component';
import { AdminAllReportsComponent } from './components/admin/admin-all-reports/admin-all-reports.component';
import { AppAdminEditMembershipComponent } from './components/admin/app-admin-edit-membership/app-admin-edit-membership.component';
import { AdminMembershipComponent } from './components/admin/admin-membership/admin-membership.component';
import { AdminAddExerciseComponent } from './components/admin/add-exercise/add-exercise.component';
import { AddEquipmentComponent } from './components/admin/add-equipment/add-equipment.component';
import { AdminTraineesAttendanceComponent } from './components/admin/admin-trainees-attendance/admin-trainees-attendance.component';
import { AdminHistoryAttendanceComponent } from './components/admin/admin-history-attendance/admin-history-attendance.component';
import { AuthorizedComponent } from './components/authorized/authorized.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RegistrationComponent,
    HeaderComponent,
    LandingPageComponent,
    LoginComponent,
    FooterComponent,
    ClassesComponent,
    UpdateClassComponent,
    AddClassComponent,
    TraineesComponent,
    ReportComponent,
    TraineeComponent,
    EditProfileComponent,
    TraineeMyClassesComponent,
    DoReviewComponent,
    ShowReviewComponent,
    AttendanceComponent,
    ShowReportComponent,
    AddTrainerComponent,
    AllTraineesComponent,
    MoreDetailsTraineeComponent,
    AdminAddClassComponent ,
    PaymentVerifyComponent,
    AllEquipmentsComponent,
    AllExersiseComponent,
    AdminMembershipComponent,
    AppAdminEditMembershipComponent,
    AdminAllReportsComponent,
    AllEquipmentsComponent,
    AllExersiseComponent,
    AdminAddExerciseComponent,
    AddEquipmentComponent,
    AdminTraineesAttendanceComponent,
    AdminHistoryAttendanceComponent,
    AuthorizedComponent
  ],

  providers: [
    ClassService,
    SidebarService,
    MembershipService,
    LoginService,
    ClassesService
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
