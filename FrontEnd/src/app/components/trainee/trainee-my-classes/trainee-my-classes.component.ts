import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';

@Component({
  selector: 'app-trainee-my-classes',
  standalone: true,
  imports: [CommonModule,
    SidebarComponent,
    RouterModule
    ],
  templateUrl: './trainee-my-classes.component.html',
  styleUrl: './trainee-my-classes.component.css'
})
export class TraineeMyClassesComponent {
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
    // console.log()
    for (let i = 0; i < classes.length; i += groupSize) {
      this.groupedClasses.push(classes.slice(i, i + groupSize));
    }
    console.log(this.groupedClasses);
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
