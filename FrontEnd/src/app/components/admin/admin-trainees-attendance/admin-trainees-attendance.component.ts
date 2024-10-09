import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-trainees-attendance',
  standalone: true,
  imports: [AdminSidebarComponent,
    CommonModule, RouterModule
  ],
  templateUrl: './admin-trainees-attendance.component.html',
  styleUrl: './admin-trainees-attendance.component.css'
})
export class AdminTraineesAttendanceComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  attendance: any;
  errorMessage: string | null = null;
  groupedTrainees: any[] = [];
  currentSlide: number = 0;
  checkedIn = false;
  checkedOut = false;

  // attendance = [
  //   { name: "sandy", checkedIn: true, checkedOut: true, id: 1, message: '' },
  //     { name: "sandy1", checkedIn: true, checkedOut: true, id: 2, message: '' },
  //     { name: "sandy2", checkedIn: true, checkedOut: false, id: 3, message: '' },
  //     { name: "sandy3", checkedIn: "", checkedOut: "", id: 4, message: '' },
  //     { name: "sandy4", checkedIn: false, checkedOut: false, id: 5, message: '' },
  //     { name: "sandy", checkedIn: true, checkedOut: true, id: 1, message: '' },
  //     { name: "sandy6", checkedIn: true, checkedOut: true, id: 2, message: '' },
  //     { name: "sandy7", checkedIn: true, checkedOut: false, id: 3, message: '' },
  //     { name: "sandy8", checkedIn: "", checkedOut: "", id: 4, message: '' },
  //     { name: "sandy9", checkedIn: false, checkedOut: false, id: 5, message: '' },
  // ];

  // Index trainees
  ngOnInit() {
    this.attendance = this.adminService.getSelectedData();
    console.log(this.attendance);
    if (!this.attendance) {
      this.trainees();
      return;
    }
    this.groupTrainees();
  }

  // Index trainees on reload
  trainees() {
    this.adminService.indexTrainees().subscribe({
      next: (response) => {
        console.log(response);
        this.attendance = response;
        this.router.navigate(['/admin-trainees-attendance']);
        this.groupTrainees();
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

  // checkIn(trainee: any): void {
  checkIn(userId: string): void {
    let user_id: number = userId ? Number(userId) : 0;
    this.adminService.checkIn(user_id).subscribe({
      next: (response) => {
        console.log(response);
        this.checkedIn = true;
        if (trainee.checkedIn) {
          trainee.message = `${trainee.name} has already checked in.`;
        } else {
          trainee.checkedIn = true;
          trainee.message = `${trainee.name} has checked in.`;
        }
        this.hideMessage(trainee);
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

  checkOut(trainee: any): void {
    if (trainee.checkedOut) {
      trainee.message = `${trainee.name} has already checked out.`;
    } else {
      trainee.checkedOut = true;
      trainee.message = `${trainee.name} has checked out.`;
    }
    this.hideMessage(trainee);
  }

  hideMessage(trainee: any): void {
    setTimeout(() => {
      trainee.message = '';
    }, 1000);
  }
  trackById(index: number, trainee: any): number {
    return trainee.id;
  }


  // constructor() {
  //   // this.groupTrainees();  // Call the grouping function when the component is initialized
  // }

  // Function to group classes for display in slides
  groupTrainees() {
    const groupSize = 5;  // Group size (5 row per group)
    for (let i = 0; i < this.attendance.length; i += groupSize) {
      this.groupedTrainees.push(this.attendance.slice(i, i + groupSize));  // Grouping the classes
    }
  }

  // Function to go to the previous slide
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  // Function to go to the next slide
  nextSlide() {
    if (this.currentSlide < this.groupedTrainees.length - 1) {
      this.currentSlide++;
    }
  }
}
