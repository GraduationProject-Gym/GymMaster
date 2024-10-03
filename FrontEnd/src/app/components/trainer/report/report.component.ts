import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, registerables, Filler } from 'chart.js';
import { ClassService } from '../../../services/trainer/class/class.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  reportId: number | undefined;
  report:any;
  equipments:string='';
  exercises:string='';

  constructor(private classService:ClassService) {
    // this.reportId = 3;
  }

  ngOnInit(){
    this.report = this.classService.getReport();
    if(this.report){
      this.equipments = this.report.class.equipments.map((el:any) => el.name).join(', ');
      this.exercises = this.report.class.exercises.map((el:any) => el.name).join(', ');
      console.log(this.report);
      this.calculateOverallRating();
      this.createChart();

    }
    if(!this.report){
      return ;
      // this.classService.geTraineeOnClass().subscribe({
      //   next: (response) => {
      //     let traineesArrays = response.data;
      //     console.log(traineesArrays);
      //     this.classService.setTrainee(traineesArrays);
      //     this.traineees = this.classService.getTrainee();
      //     const groupSize = 3;
      //     const traineesArray = this.traineees;
      //     for (let i = 0; i < traineesArray.length; i += groupSize) {
      //       this.traineees[i].showReview = false;
      //       this.groupedTrainees.push(traineesArray.slice(i, i + groupSize));
      //     }
      //     },
      //   error: (error) => {
      //     if (error.status === 403) {
      //       // this.errorMessage = error.error?.message || 'You are not authorized to view this class.';
      //     }else if (error.status === 401) {
      //       console.log("not Auth");
      //       this.router.navigate(['login']);
      //     }
      //     else {
      //       // this.errorMessage = 'An unexpected error occurred. Please try again later.';
      //     }
      //   }
      // });
    }
  }
  // setSelectedclass
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
      // exercise: 'Downward Dog, Warrior Pose, Tree Pose',
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
  calculateOverallRating() {
    const comments = this.report.review;
    console.log(comments);
    const totalRating = comments.reduce((sum:number, comment:any) => sum + comment.rating, 0);
    const numberOfRatings = comments.length;
    this.traineeReport.overallRating = totalRating / numberOfRatings;
  }

    // Lifecycle hook that runs after component initialization
  // ngOnInit(): void {


  // }
  createChart() {
    const labels = this.report.review.map((comment: any) => comment.created_at);
    const data = this.report.review.map((comment:  any) => comment.rating);
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

