import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-history-attendance',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule],
  templateUrl: './admin-history-attendance.component.html',
  styleUrls: ['./admin-history-attendance.component.css']
})
export class AdminHistoryAttendanceComponent implements OnInit {

  traineeId: number | undefined;
  traineeData: any;
  errorMessage: string | null = null;

  // trainees = [
  //   {
  //     name: "sandy",
  //     id: 1,
  //     attendanceRecords: [
  //       { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
  //       { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
  //       { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
  //       { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
  //     ]
  //   },
  //   {
  //     name: "sandy1",
  //     id: 2,
  //     attendanceRecords: [
  //       { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
  //       { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
  //       { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
  //       { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
  //     ]
  //   },
  //   {
  //     name: "sandy2",
  //     id: 3,
  //     attendanceRecords: [
  //       { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
  //       { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
  //       { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
  //       { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
  //     ]
  //   },


  // ];

  constructor(private route: ActivatedRoute, private router:Router, private adminService:AdminService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.traineeId = id ? +id : undefined; 
    this.traineeData = this.adminService.getSelectedData();
    console.log(this.traineeData);
    if (!this.traineeData) {
      this.attendance(this.traineeId);
      return;
    }
  }

  // Handle reload case
  attendance(traineeId: any) {
    this.errorMessage = null; // Reset the error message
    let user_id: number = traineeId ? Number(traineeId) : 0;

    this.adminService.indexAttendanceHistory(user_id).subscribe({
      next: (response: any) => {
        this.traineeData = response.attendance;
        console.log(this.traineeData);
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
