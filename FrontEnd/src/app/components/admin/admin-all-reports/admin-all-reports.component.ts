import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryScale, Filler, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';
import { Chart } from 'chart.js';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../../../services/trainer/class/class.service';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { AdminService } from '../../../services/admin/admin.service';


@Component({
  selector: 'app-admin-all-reports',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    AdminSidebarComponent,
  ],  templateUrl: './admin-all-reports.component.html',
  styleUrl: './admin-all-reports.component.css'
})
export class AdminAllReportsComponent {
  errorMessage:string='';
  reportId: number | undefined;
  currentSlide = 0;
  groupedTrainees:any;
  equipments:string[]=[];
  exercises:string[]=[];
  recommend:string[]=[];
  overAllComment:string[]=[];
  data:any;

  constructor(
     private adminService: AdminService,
     private router: Router) {
  }

  ngOnInit() {
    this.data = this.adminService.getSelectedData();
    if(this.data){
      console.log(this.data);
      this.calculateOverallRating();
      this.groupedTrainees = this.groupTrainees();
      console.log('Grouped Trainees:', this.groupedTrainees);
    }else{
      console.log(12);
      this.reloadPage();
    }
  }

  // trackByReportId(index: number, trainee: any): number {
  //   return trainee.reportId ? trainee.reportId : index;
  // }
    // Object to hold the trainee report details
  traineeReports: { overallRating: number }[] = [];
  // Method to calculate the overall rating based on comments
  calculateOverallRating(): void {
    this.data?.data?.forEach((trainee: any, index: number) => {
      const comments = trainee.reviews ?? []; // Get the reviews for each trainee
      let overallRating = 0; // Default rating
      if (comments.length > 0) {
        const totalRating = comments.reduce((sum: number, comment: any) => sum + comment.rating, 0);
        const numberOfRatings = comments.length;
        overallRating = totalRating / numberOfRatings; // Calculate average rating
      }
      // Assign overallRating for each trainee in the array
      this.traineeReports[index] = { overallRating };
      this.equipments[index] = this.data.data[index].class.equipments.map((el: any) => el.name).join(', ');
      this.exercises[index] = this.data.data[index].class.exercises.map((el: any) => el.name).join(', ');
    });
  }


    // Method to handle report submission
    downloadReport(): void {
      // console.log('Report Downloaded:', this.traineeReport);
    }

//


//create chart
createChart(index: number): void {
  const canvasId = `ratingChart${index}`;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!canvas) {
    console.error(`Failed to create chart: Canvas with id '${canvasId}' not found`);
    return;
  }
  console.log('Canvas found:', canvasId);

  const labels = this.data.data[index].reviews.map((comment: any) => comment.created_at);
  const data = this.data.data[index].reviews.map((comment:any) => comment.rating);

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

reloadPage(){
  this.adminService.getReports().subscribe({
    next: (response) => {
      this.adminService.setSelectedData(response);
      this.data = this.adminService.getSelectedData();
      this.calculateOverallRating();
      this.groupedTrainees = this.groupTrainees();
      console.log('Grouped Trainees:', this.groupedTrainees);
      this.router.navigate(['/admin-reports']);
    },
    error: (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/login']);
        this.errorMessage = error.error?.message;
      } else if (error.status === 403) {
        this.errorMessage = error.error?.message;
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
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
  this.data.data.forEach((trainee: any, index: number) => {
    this.createChart(index); // Using the correct index for each trainee
  });
}



prevSlide(): void {
  if (this.currentSlide > 0) {
    this.currentSlide--;
  }
}

nextSlide():any {
  if (this.currentSlide < this.groupedTrainees.length - 1) {
    this.currentSlide++;
  }
}

groupTrainees(): any[] {
  if (!this.data.data || this.data.data.length === 0) {
    return [];
  }
  return this.data.data.map((trainee: any) => [trainee]);
}


}
