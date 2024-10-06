import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, registerables, Filler } from 'chart.js';
import { ClassService } from '../../../services/trainer/class/class.service';
// import { Router } from 'express';
import { ActivatedRoute,Router } from '@angular/router';

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
  errorMessages:string='';
  vailedMessages:string='';
  trainee_id:any;
  constructor(
    private router: Router,
    private classService:ClassService,
     private route: ActivatedRoute,
     private cd: ChangeDetectorRef
    ) {}
  ngOnInit(){
    this.report = this.classService.getReport();
    if(this.report){
      this.equipments = this.report.class.equipments.map((el:any) => el.name).join(', ');
      this.exercises = this.report.class.exercises.map((el:any) => el.name).join(', ');
      this.calculateOverallRating();
      this.createChart();
    }
    else{
       // Access the trainee ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.trainee_id = params.get('id'); // Access the ID passed in the URL
      this.trainee_id = this.trainee_id? Number(this.trainee_id):0;
      this.classService.createReport(this.trainee_id).subscribe({
        next: (response) => {
          console.log(response);
          this.classService.setReport(response);
          this.report = this.classService.getReport();
          this.equipments = this.report.class.equipments.map((el:any) => el.name).join(', ');
          this.exercises = this.report.class.exercises.map((el:any) => el.name).join(', ');
          this.calculateOverallRating();
          this.createChart();
        },
        error: (error) => {
          console.log(error);
          if (error.status === 403) {
              if (error.error?.message) {
                Object.keys(error.error.message).forEach(key => {
                  this.errorMessages= error.error.message[key];
                   setTimeout(() => {
                    // delete this.errorMessages;
                  }, 5000);
                });
          }}else if (error.status === 401) {
            // console.log("not Auth");
          this.router.navigate(['login']);
          }
          else {
            this.errorMessages = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    });
    }
  }


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
  // submitReport(): void {
  //   console.log('Report Submitted:', this.traineeReport);
  // }
  submitReport(userId:string | null, over_all_comment:string|null , recommend:string| null){
    let user_id: number = userId? Number(userId):0;

      const newReview = {
        'trainee_id':user_id,
        'over_all_comment':over_all_comment,
        'recommend': recommend,
      };

    if (user_id) {
      this.classService.setRecommend(newReview).subscribe({
        next: (response) => {
          console.log(response);
          window.location.href = `/trainer/trainees/create-report/${user_id}`;
          this.vailedMessages= "done";
          setTimeout(() => {
            this.vailedMessages= "";

         }, 5000);
        },
        error: (error) => {
          console.log(error);
          if (error.status === 403) {
              if (error.error?.message) {
                Object.keys(error.error.message).forEach(key => {
                  this.errorMessages= error.error.message[key];
                  setTimeout(() => {
                    this.errorMessages = "";
                  }, 5000);
                });


          }}else if (error.status === 401) {
            // console.log("not Auth");
            this.router.navigate(['login']);
          }
          else {
            this.errorMessages = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    }
  }
}

