import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';

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
    private router: Router
  ) { }

  classes: any[] = [];
  groupedClasses: any[] = [];
  currentSlide: number = 0;
  errorMessage: string | null = null;

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
}
