import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MembershipComponent } from '../membership/membership.component';
// import { ProfileService } from '../../../services/authentication/profile/profile.service';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';

@Component({
  selector: 'app-trainee',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    SidebarComponent,
    EditProfileComponent,
    MembershipComponent
  ],
  // providers:[ProfileService],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.css'
})
export class TraineeComponent implements OnInit {
  constructor(private sidebarService: SidebarService, private router: Router) {}
  data: any;
  errorMessage: string | null = null;
  // dataFlag = false;

  ngOnInit() {
    this.data = this.sidebarService.getSelectedData();
    // this.dataFlag = true;
    if (!this.data) {
      this.profile();
      // console.log(this.data);  
      return;
    }
    this.setProfileImage(this.data);
    console.log(this.data);
  }

  // Handle reload case
  profile() {
    this.errorMessage = null; // Reset the error message 
    this.sidebarService.getProfileData().subscribe({
      next: (response) => {
        // this.dataFlag = true;
        console.log(response);
        this.data = response;
        this.setProfileImage(this.data);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  setProfileImage(data: any) {
    if (!data.srcImg) {
      data.srcImg = data.gender === 'female' ? "/female.png" : "/male.png";
    }
  }
}
