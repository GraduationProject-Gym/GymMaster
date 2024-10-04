import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js';
@Component({
  selector: 'app-show-report',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    SidebarComponent,
  ],
  templateUrl: './show-report.component.html',
  styleUrl: './show-report.component.css'
})
export class ShowReportComponent implements OnInit{
  reportId: number | undefined;
  currentSlide = 0;
  groupedTrainees = this.groupTrainees();

  constructor() {
    this.reportId ;
  }

  ngOnInit() {
    
    this.calculateOverallRating();
    this.groupedTrainees = this.groupTrainees();
    console.log('Grouped Trainees:', this.groupedTrainees);
  }


  trainees = [
    {
      reportId:1,
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
      futureRecommendations:"Continue training on flexibility and improve fitness.",
      overallComment:"Excellent performance. Keep up the hard work!",

            // Array of feedback comments with ratings
      comments: [
        { comment: 'This is the first comment', rate: 4 , day:"22/08/2024"},
        { comment: 'Great post!', rate: 3 , day:"25/08/2024" },
        { comment: 'Thanks for sharing!', rate: 5,  day:"28/08/2024" },
        { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        { comment: 'Thanks for sharing!', rate: 5,  day:"28/08/2024" },
        // { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        // { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        // { comment: 'Fantastic work!', rate: 5,  day:"2/09/2024"}
      ]
    },
    {
      reportId:2,
      name: 'John Doe2',
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
      futureRecommendations:"Continue training on flexibility and improve fitness.",
      overallComment:"Excellent performance. Keep up the hard work!",

            // Array of feedback comments with ratings
      comments: [
        { comment: 'This is the first comment', rate: 4 , day:"22/08/2024"},
        { comment: 'Great post!', rate: 3 , day:"25/08/2024" },
        { comment: 'Thanks for sharing!', rate: 5,  day:"28/08/2024" },
        { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        { comment: 'Thanks for sharing!', rate: 5,  day:"28/08/2024" },
        // { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        // { comment: 'Really insightful post.', rate: 2,  day:"30/08/2024" },
        // { comment: 'Fantastic work!', rate: 5,  day:"2/09/2024"}
      ]
    },
  ];

  trackByReportId(index: number, trainee: any): number {
    return trainee.reportId ? trainee.reportId : index;
  }
    // Object to hold the trainee report details
  traineeReport = {
    overallRating:0,
  };

    // Method to calculate the overall rating based on comments
  calculateOverallRating(): void {
    const comments = this.trainees[0].comments;
    const totalRating = comments.reduce((sum, comment) => sum + comment.rate, 0);
    const numberOfRatings = comments.length;

    this.traineeReport.overallRating = totalRating / numberOfRatings;
  }


    // Method to handle report submission
    downloadReport(): void {
    console.log('Report Downloaded:', this.traineeReport);
  }

//


//create chart
createChart(reportId: number, index: number): void {
  const canvasId = `ratingChart${index}`;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!canvas) {
    console.error(`Failed to create chart: Canvas with id '${canvasId}' not found`);
    return;
  }
  console.log('Canvas found:', canvasId);

  const labels = this.trainees[index].comments.map(comment => comment.day);
  const data = this.trainees[index].comments.map(comment => comment.rate);

  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

  new Chart(canvas, {
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


// Lifecycle hook that runs after component initialization


chartsCreated = false;

ngAfterViewChecked(): void {
  if (!this.chartsCreated) {
    this.createChartsForAllReports();
    this.chartsCreated = true;
  }
}

createChartsForAllReports(): void {
    this.trainees.forEach((trainee, index) => {
      this.createChart(trainee.reportId, index);
    });
}



prevSlide(): void {
  if (this.currentSlide > 0) {
    this.currentSlide--;
  }
}

nextSlide(): void {
  if (this.currentSlide < this.groupedTrainees.length - 1) {
    this.currentSlide++;
  }
}

groupTrainees(): any[] {
  if (!this.trainees || this.trainees.length === 0) {
    return [];
  }

  return this.trainees.map(trainee => [trainee]);
}

}

