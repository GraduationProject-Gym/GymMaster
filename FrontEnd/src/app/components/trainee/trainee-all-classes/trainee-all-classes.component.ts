import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { ClassesService } from '../../../services/trainee/classes/classes.service';

@Component({
  selector: 'app-trainee-all-classes',
  standalone: true,
  imports: [CommonModule,
    SidebarComponent,
    RouterModule
  ],
  templateUrl: './trainee-all-classes.component.html',
  styleUrl: './trainee-all-classes.component.css'
})
export class TraineeAllClassesComponent {

  constructor(
    private sidebarService: SidebarService,
    private classesService: ClassesService,
    private router: Router
  ) { }

  classes: any[] = [];
  groupedClasses: any[] = [];
  currentSlide: number = 0;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Index classes
  ngOnInit() {
    this.classes = this.sidebarService.getSelectedData();
    console.log(this.classes);
    if (!this.classes) {
      this.router.navigate(['/trainee']);
      return;
    }
    this.groupClasses(this.classes);
  }

  groupClasses(classes: any[] = []) {
    const groupSize = 1;
    for (let i = 0; i < classes.length; i += groupSize) {
      this.groupedClasses.push(classes.slice(i, i + groupSize));
    }
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  trackByClassId(index: number, classObj: any) {
    return classObj.classId;
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.groupedClasses.length - 1) {
      this.currentSlide++;
    }
  }

  joinClass(classId: string) {
    let classIdNumber: number = Number(classId);

    this.classesService.joinClass(classIdNumber).subscribe({
      next: (response: any) => {
        console.log(response);
        this.successMessage = response.message;
        // Show success message for 3 seconds before navigating
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/trainee-myClasses']);
        }, 3000); 
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status === 403 && error.error?.message) {
          this.errorMessage = error.error?.message;
        } else if (error.status === 403 && error.error?.joined) {
          this.errorMessage = error.error?.joined;
          this.router.navigate(['/trainee-myClasses']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
        // Show error message for 5 seconds before clearing it
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
  }

}
