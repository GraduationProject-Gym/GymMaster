import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, registerables, Filler } from 'chart.js';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  constructor() {
    this.reportId = 3;
  }
  reportId: number | undefined;

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
        { comment: 'This is the first comment', rate: 4 , day:"22/08/2024"},
        { comment: 'Great post!', rate: 3 , day:"25/08/2024" },
        { comment: 'Thanks for sharing!', rate: 5,  day:"28/08/2024" },
        { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        { comment: 'Thanks for sharing!', rate: 5,  day:"28/08/2024" },
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
    this.createChart();

  }
  createChart(): void {
    const labels = this.trainees[0].comments.map(comment => comment.day);
    const data = this.trainees[0].comments.map(comment => comment.rate);
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

    new Chart('ratingChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rate',
          data: data,
          borderColor: '#ff6207',
          backgroundColor: 'rgba(255, 98, 7, 0.5)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 5
          }
        }
      }
    });
  }

    // Method to handle report submission
  submitReport(): void {
    console.log('Report Submitted:', this.traineeReport);
  }
}

