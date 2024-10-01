import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

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
      {
        className: 'Zumba Class',
        classId: 3,
        sessions: 4,
        status: 'active',
        equipment: 'None',
        description: 'A fun and energetic dance workout to keep you moving.',
        totalNoOfSession: 12,
        exercise: 'Salsa, Merengue, Cumbia',
        sessionsInfo: [
          { days: 'Tuesday', hours: '7:00 PM - 8:00 PM' },
          { days: 'Saturday', hours: '10:00 AM - 11:00 AM' }
        ],
        trainerName:"Ahmed"

      },
      {
        className: 'HIIT Class',
        classId: 4,
        sessions: 8,
        status: 'active',
        equipment: 'Dumbbells, Resistance Bands',
        description: 'High-intensity interval training to boost cardio and strength.',
        totalNoOfSession: 15,
        exercise: 'Burpees, Mountain Climbers, Jump Squats',
        sessionsInfo: [
          { days: 'Monday', hours: '6:00 AM - 7:00 AM' },
          { days: 'Wednesday', hours: '6:00 PM - 7:00 PM' }
        ],
        trainerName:"Ahmed"

      },
      {
        className: 'Spinning Class',
        classId: 5,
        sessions: 7,
        status: 'inactive',
        equipment: 'Spinning Bike',
        description: 'Indoor cycling workout for endurance and strength.',
        totalNoOfSession: 10,
        exercise: 'Hill Climb, Sprint, Interval Training',
        sessionsInfo: [
          { days: 'Tuesday', hours: '6:30 PM - 7:30 PM' },
          { days: 'Thursday', hours: '7:00 AM - 8:00 AM' }
        ]
      },
      {
        className: 'CrossFit Class',
        classId: 6,
        sessions: 10,
        status: 'active',
        equipment: 'Kettlebells, Pull-up Bar',
        description: 'Strength and conditioning program with varied movements.',
        totalNoOfSession: 20,
        exercise: 'Deadlifts, Pull-ups, Box Jumps',
        sessionsInfo: [
          { days: 'Friday', hours: '5:00 PM - 6:30 PM' },
          { days: 'Sunday', hours: '9:00 AM - 10:30 AM' }
        ],
        trainerName:"Ahmed"

      }
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
