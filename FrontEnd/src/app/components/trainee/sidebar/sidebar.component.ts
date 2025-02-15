import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private sidebarService: SidebarService, private router: Router) { }

  memberships: any[] = [];
  errorMessage: string | null = null;
  warningMessage: string | null = null;


  showReports() {
    this.sidebarService.getReports().subscribe({
      next: (response) => {
        console.log(response);
        this.sidebarService.setSelectedData(response);
        this.router.navigate(['/trainee-showReport']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  profile() {
    this.errorMessage = null; // Reset the error message
    this.sidebarService.getProfileData().subscribe({
      next: (response) => {
        console.log(response);
        this.sidebarService.setSelectedData(response);
        this.router.navigate(['/trainee-profile']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Index memeberships
  membership() {
    this.errorMessage = null; // Reset the error message
    this.sidebarService.indexMemberships().subscribe({
      next: (response: any) => {
        this.sidebarService.setSelectedData(response.Memberships);
        // console.log(response.Memberships);
        this.router.navigate(['/trainee-membership']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          // console.log(error);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Show my classes
  myClasses() {
    this.errorMessage = null; // Reset the error message
    this.warningMessage = null;
    this.sidebarService.indexMyClasses().subscribe({
      next: (response: any) => {
        this.sidebarService.setSelectedData(response.joinedClasses);
        // console.log(response.joinedClasses);
        this.router.navigate(['/trainee-myClasses']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          // console.log(error);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Index classes
  classes() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexClasses().subscribe({
      next: (response: any) => {
        console.log(response);
        // Index unjoined classes only
        const unjoinedClasses = response.gymclassData.filter((gymClass: any) => gymClass.checkJoin === false);
        if (unjoinedClasses.length > 0) {
          this.sidebarService.setSelectedData(unjoinedClasses);
          console.log(unjoinedClasses);
          this.router.navigate(['/trainee-allClasses']);
        } else {
          // console.log('You have already joined all classes.');
          this.warningMessage = 'You have already joined all available classes.';
        }
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Index my trainers
  trainers() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexMyTrainers().subscribe({
      next: (response: any) => {
        this.sidebarService.setSelectedData(response.trainers);
        console.log(response);
        this.router.navigate(['/trainee-doReview']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // show my reviews
  showMyReviews() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexMyReviews().subscribe({
      next: (response) => {
        this.sidebarService.setReviews(response);
        console.log(response.joinedClasses);
        // console.log(response);
        window.location.href = this.router.serializeUrl(this.router.createUrlTree(['trainee-showReviews']));
        // this.router.navigate(['/trainee-showReviews']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Index my attendance
  attendance() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexMyAttendance().subscribe({
      next: (response: any) => {
        this.sidebarService.setSelectedData(response.attendance);
        console.log(response.attendance);
        this.router.navigate(['/trainee-attendance']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // dropdown classes & reviews
  dropdownOpenClass = false;
  dropdownOpenReview = false;

  toggleDropdownClass() {
    this.dropdownOpenClass = !this.dropdownOpenClass;
  }

  toggleDropdownReview() {
    this.dropdownOpenReview = !this.dropdownOpenReview;
  }
}
