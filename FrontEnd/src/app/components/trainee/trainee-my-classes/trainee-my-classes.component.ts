import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

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

  classes = [
    {
      className: 'Yoga Class',
      classId: 1,
      sessions: 5,
      status: 'active',
      equipment: 'Yoga Mat, Resistance Bands',
      description: 'A yoga class focused on flexibility and balance.',
      totalNoOfSession: 8,
      exercise: 'Downward Dog, Warrior Pose, Tree Pose',
      sessionsInfo: [
        { days: 'Monday', hours: '10:00 AM - 11:30 AM' },
        { days: 'Thursday', hours: '6:00 PM - 7:30 PM' }
      ],
      trainerName:"Ahmed"
    },
    {
      className: 'Pilates Class',
      classId: 2,
      sessions: 6,
      status: 'inactive',
      equipment: 'Pilates Ring, Exercise Ball',
      description: 'Improve core strength and flexibility with Pilates.',
      totalNoOfSession: 10,
      exercise: 'Hundred, Leg Circles, Roll Up',
      sessionsInfo: [
        { days: 'Wednesday', hours: '8:00 AM - 9:00 AM' },
        { days: 'Friday', hours: '5:00 PM - 6:00 PM' }
      ],
      trainerName:"Ahmed"

    },
  ];

  trackByClassId(index: number, classObj: any) {
    return classObj.classId;
  }

  groupedClasses: any[] = [];
  currentSlide: number = 0;

  constructor() {
    this.groupClasses();
  }

  groupClasses() {
    const groupSize = 1;
    for (let i = 0; i < this.classes.length; i += groupSize) {
      this.groupedClasses.push(this.classes.slice(i, i + groupSize));
    }
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

