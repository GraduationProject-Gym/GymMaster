import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  constructor(private adminService: AdminService, private router: Router) { }
//dropdown
  dropdownOpenTrainers = false;
  dropdownOpenReview = false;
  dropdownOpenClasses = false;

  toggleDropdownTrainers() {
    this.dropdownOpenTrainers = !this.dropdownOpenTrainers;
  }
  toggleDropdownClasses() {
    this.dropdownOpenClasses = !this.dropdownOpenClasses;
  }
  toggleDropdownReview() {
    this.dropdownOpenReview = !this.dropdownOpenReview;
  }

  errorMessage: string | null = null;
  // get all trainers
  trainers(){
    this.errorMessage = null; // Reset the error message
    this.adminService.indexTrainers().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setTools(response);
        this.router.navigate(['/admin-trainers']);
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
  dropdownOpenMembership= false;
  dropdownOpenAttendance= false;

   toggleDropdownMembership() {
    this.dropdownOpenMembership = !this.dropdownOpenMembership;
  }

  toggleDropdownAttendance (){
    this.dropdownOpenAttendance = !this.dropdownOpenAttendance;
  }


  // get all trainees
  trainees(){
    this.errorMessage = null; // Reset the error message
    this.adminService.indexTrainees().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.router.navigate(['/admin-trainees']);
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

  addClass(){
    this.adminService.addClass().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.router.navigate(['/admin-addClass']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-addClass']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
