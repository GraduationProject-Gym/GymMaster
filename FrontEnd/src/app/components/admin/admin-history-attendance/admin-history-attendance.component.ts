import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

  trainees = [
    {
      name: "sandy",
      id: 1,
      attendanceRecords: [
        { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
        { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
      ]
    },
    {
      name: "sandy1",
      id: 2,
      attendanceRecords: [
        { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
        { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
      ]
    },
    {
      name: "sandy2",
      id: 3,
      attendanceRecords: [
        { date: '2024-09-10', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-12', checkIn: '09:00 AM', checkOut: '11:30 AM' },
        { date: '2024-09-14', checkIn: '08:00 AM', checkOut: '10:00 AM' },
        { date: '2024-09-15', checkIn: '07:00 PM', checkOut: '11:30 PM' }
      ]
    },
    
    
  ];

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.traineeId = id ? +id : undefined; 
    this.loadTraineeData();
  }
  

  loadTraineeData() {
    this.traineeData = this.trainees.find(trainee => trainee.id === this.traineeId);
  }
}
