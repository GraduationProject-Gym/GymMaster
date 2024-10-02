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
        this.sidebarService.setSelectedData(response);
        // console.log(response);
        this.router.navigate(['/trainee-allClasses']);
      },
      error: (error) => {
        // console.log(error);
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
        this.sidebarService.setSelectedData(response);
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
