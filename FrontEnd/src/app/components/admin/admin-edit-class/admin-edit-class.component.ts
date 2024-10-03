
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAllClassesComponent } from '../admin-all-classes/admin-all-classes.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-edit-class',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    AdminAllClassesComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-edit-class.component.html',
  styleUrl: './admin-edit-class.component.css'
})
export class AdminEditClassComponent implements OnInit{

  className: string = '';
  sessions: number = 0;
  status: string = '';
  equipment: string = '';
  description: string = '';
  exercise: string = '';
  groups = [
    { days: '', hours: '' },
    { days: '', hours: '' }
  ];
  trainerName: string | undefined;




  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  hours = [
    '08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM',
    '08:00 PM - 09:00 PM', '09:00 PM - 10:00 PM', '10:00 PM - 11:00 PM', '11:00 PM - 12:00 AM'
  ];
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
        { days: 'Monday', hours: '10:00 AM - 11:00 AM' },
        { days: 'Thursday', hours: '06:00 PM - 07:00 PM' }
      ],
      trainerName: "Ahmed"
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
        { days: 'Wednesday', hours: '08:00 AM - 09:00 AM' },
        { days: 'Friday', hours: '5:00 PM - 6:00 PM' }
      ],
      trainerName: "Ahmed"
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
        { days: 'Tuesday', hours: '07:00 PM - 08:00 PM' },
        { days: 'Saturday', hours: '10:00 AM - 11:00 AM' }
      ],
      trainerName: "Ahmed"
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
        { days: 'Monday', hours: '06:00 AM - 07:00 AM' },
        { days: 'Wednesday', hours: '06:00 PM - 07:00 PM' }
      ],
      trainerName: "Ahmed"
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
        { days: 'Tuesday', hours: '06:00 PM - 07:00 PM' },
        { days: 'Thursday', hours: '08:00 AM - 09:00 AM' }
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
        { days: 'Friday', hours: '05:00 PM - 6:00 PM' },
        { days: 'Sunday', hours: '09:00 AM - 10:00 AM' }
      ],
      trainerName: "Ahmed"
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get classId from route params
    const classId = Number(this.route.snapshot.paramMap.get('classId'));

    // Find the class by classId
    const classData = this.classes.find(c => c.classId === classId);
    if (classData) {
      // Populate the form with the selected class data
      this.className = classData.className;
      this.sessions = classData.sessions;
      this.status = classData.status;
      this.equipment = classData.equipment;
      this.description = classData.description;
      this.exercise = classData.exercise;
      this.trainerName= classData.trainerName;
      this.groups = classData.sessionsInfo.map(session => ({
        days: session.days,
        hours: session.hours
      }));
    }

    console.log(classData);
  }

  save() {
    console.log('Updated Class Info:', {
      className: this.className,
      sessions: this.sessions,
      status: this.status,
      groups: this.groups,
      equipment: this.equipment,
      description: this.description,
      exercise: this.exercise,
      // trainerName: this.trainerName,

    });

    this.router.navigate(['/admin-allClasses']);
  }

  cancel() {
    this.router.navigate(['/admin-allClasses']);
  }
}



