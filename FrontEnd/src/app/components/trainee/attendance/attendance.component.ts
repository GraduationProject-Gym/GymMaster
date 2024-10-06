import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) { }

  attendanceRecords: any;
  errorMessage: string | null = null;

  // Index attendance
  ngOnInit() {
    this.attendanceRecords = this.sidebarService.getSelectedData();
    console.log(this.attendanceRecords);
    if (!this.attendanceRecords) {
      this.attendance();
      return;
    }
  }

  // Handle reload case
  attendance() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexMyAttendance().subscribe({
      next: (response) => {
        this.attendanceRecords = response.attendance;
        console.log(this.attendanceRecords);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
