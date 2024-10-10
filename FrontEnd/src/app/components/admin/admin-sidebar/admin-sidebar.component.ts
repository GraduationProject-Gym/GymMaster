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
  dropdownOpenEquipment = false;
  dropdownOpenExercise = false;
  dropdownOpenClasses = false;
  dropdownOpenMembership= false;
  dropdownOpenAttendance= false;

  toggleDropdownTrainers() {
    this.dropdownOpenTrainers = !this.dropdownOpenTrainers;
  }
  toggleDropdownClasses() {
    this.dropdownOpenClasses = !this.dropdownOpenClasses;
  }
  toggleDropdownEquipment() {
    this.dropdownOpenEquipment = !this.dropdownOpenEquipment;
  }

  toggleDropdownExercise() {
    this.dropdownOpenExercise = !this.dropdownOpenExercise;
  }

   toggleDropdownMembership() {
    this.dropdownOpenMembership = !this.dropdownOpenMembership;
  }

  toggleDropdownAttendance (){
    this.dropdownOpenAttendance = !this.dropdownOpenAttendance;
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
        window.location.href=this.router.serializeUrl(this.router.createUrlTree(['/admin-addClass']));//;this.router.navigate(['/']);

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
  allReports(){
    this.adminService.getReports().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.router.navigate(['/admin-reports']);
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

  //indexClasses
  allClasses(){
    this.errorMessage = null; // Reset the error message
    this.adminService.indexClasses().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response.gymclassData);
        this.router.navigate(['/admin-allClasses']);
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

  //indexEquipments
  allEquipments(){
    this.errorMessage = null; // Reset the error message
    this.adminService.indexEquipments().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.router.navigate(['/admin-allEquipments']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-allEquipments']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // indexExercises
  allExercises(){
    this.errorMessage = null; // Reset the error message
    this.adminService.indexExercises().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.router.navigate(['/admin-allExersise']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-allExersise']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }


  //indexMemberships
  allMemberships(){
    this.errorMessage = null; // Reset the error message
    this.adminService.indexMemberships().subscribe({
      next: (response) => {
        console.log(response.Memberships);
        this.adminService.setSelectedData(response.Memberships);
        this.router.navigate(['/admin-membership']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-membership']);
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



