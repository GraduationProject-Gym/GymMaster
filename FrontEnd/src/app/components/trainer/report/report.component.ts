import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Make sure to import FormsModule

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule], // Include CommonModule here
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'] // Corrected to styleUrls
})
export class ReportComponent {
  trainees = [
    {
      name: 'John Doe',
      trainerName: 'Coach Smith',
      className: 'Yoga',
      sessionsAttended: 10,
      membership: 'Premium',
      subscription: 'Monthly',
      showComments: false,
      comments: []
    },
  ];

  traineeReport = {
    performance: 0,
    attendance: 0,
    engagement: 0,
    coachComments: '',
    recommendations: '',
    overallRating: 0
  };

  submitReport(): void {
    console.log('Report Submitted:', this.traineeReport);
    // You can add more logic here for form submission, e.g., calling a service
  }
}
