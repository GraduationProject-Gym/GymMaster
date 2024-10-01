import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule

  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  attendanceRecords=[
        { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
        { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
      ];


    }
