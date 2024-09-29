import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClassesComponent } from './components/trainer/classes/classes.component';
import { UpdateClassComponent } from './components/trainer/update-class/update-class.component';
import { ShowClassComponent } from './components/trainer/show-class/show-class.component';
import { AddClassComponent } from './components/trainer/add-class/add-class.component';
import { TraineesComponent } from './components/trainer/trainees/trainees.component';
import { ReportComponent } from './components/trainer/report/report.component';
import { TraineeComponent } from './components/trainee/profile/trainee.component';
import { EditProfileComponent } from './components/trainee/edit-profile/edit-profile.component';
import { TraineeClassesComponent } from './components/trainee/trainee-classes/trainee-classes.component';
import { MembershipService } from './services/trainee/membership/membership.service';
import { ClassService } from './services/trainer/class/class.service';
import { SidebarService } from './services/trainee/sidebar/sidebar.service';

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
    ShowClassComponent,
    AddClassComponent,
    TraineesComponent,
    ReportComponent,
    TraineeComponent,
    EditProfileComponent
    ],
    providers:[
      MembershipService,
      ClassService,
      SidebarService
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';

}
