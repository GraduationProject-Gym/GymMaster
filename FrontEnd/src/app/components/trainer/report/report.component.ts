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
    // Array of trainee objects to hold trainee details

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
            // Array of feedback comments with ratings
      comments: [
        { comment: 'This is the first comment', rate: 4 },
        { comment: 'Great post!', rate: 3 },
        { comment: 'Thanks for sharing!', rate: 5 },
        { comment: 'Really insightful post.', rate: 2 },
        { comment: 'Fantastic work!', rate: 5 }
      ]
    },
  ];

    // Object to hold the trainee report details
  traineeReport = {
    coachComments: '',
    recommendations: '',
    overallRating:0,
  };

    // Method to calculate the overall rating based on comments
  calculateOverallRating(): void {
    const comments = this.trainees[0].comments;
    const totalRating = comments.reduce((sum, comment) => sum + comment.rate, 0);
    const numberOfRatings = comments.length;

    this.traineeReport.overallRating = totalRating / numberOfRatings;
  }

    // Lifecycle hook that runs after component initialization
  ngOnInit(): void {
    this.calculateOverallRating();
  }

    // Method to handle report submission
  submitReport(): void {
    console.log('Report Submitted:', this.traineeReport);
  }
}

