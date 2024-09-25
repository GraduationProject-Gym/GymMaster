import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
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
      age:23,
      email:"sandy23@getMaxListeners.com",
      phone:"01271024421",
      address:"Asyut",
      gender:"female",
      totalNoOfSession:8,
      exercise: 'Downward Dog, Warrior Pose, Tree Pose',
      equipment: 'Yoga Mat, Resistance Bands',
      showComments: false,
      comments: [
        { comment: 'This is the first comment', rate: 4 },
        { comment: 'Great post!', rate: 3 },
        { comment: 'Thanks for sharing!', rate: 5 },
        { comment: 'Really insightful post.', rate: 2 },
        { comment: 'Fantastic work!', rate: 5 }
      ]
    },

  ];

  traineeReport = {
    // performance: 0,
    // attendance: 0,
    // engagement: 0,
    coachComments: '',
    recommendations: '',
    overallRating:
  };

  submitReport(): void {
    console.log('Report Submitted:', this.traineeReport);
  }
}
