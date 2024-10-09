import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAllClassesComponent } from '../admin-all-classes/admin-all-classes.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



interface SessionInfo {
  days: string;
  startHour: string;
  endHour: string;
  date?: string;}

@Component({
  selector: 'app-admin-edit-class',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    AdminAllClassesComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-edit-class.component.html',
  styleUrls: ['./admin-edit-class.component.css']
})

export class AdminEditClassComponent implements OnInit {

  // Declare variables for editing the class
  trainerName: string | undefined;
  className!: string;
  sessions!: number;
  status!: string;
  equipment!: string[];
  description!: string;
  exercise!: string[];
  selectedEquipment: { [key: string]: boolean } = {};
  selectedExercises: { [key: string]: boolean } = {};
  exerciseList: string[] = [];
  groups: SessionInfo[] = [];

  // Available days
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // List of available classes
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
      groups: [
        { days: 'Monday', startHour: '10:00', endHour: '11:00', date:"" },
        { days: 'Thursday', startHour: '18:00', endHour: '19:00', date:"" },
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
      groups: [
        { days: 'Wednesday', startHour: '08:00', endHour: '09:00' },
        { days: 'Friday', startHour: '17:00', endHour: '18:00' }
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
      groups: [
        { days: 'Tuesday', startHour: '19:00', endHour: '20:00' },
        { days: 'Saturday', startHour: '10:00', endHour: '11:00' }
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
      groups: [
        { days: 'Monday', startHour: '06:00', endHour: '07:00' },
        { days: 'Wednesday', startHour: '18:00', endHour: '19:00' }
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
      groups: [
        { days: 'Tuesday', startHour: '18:00', endHour: '19:00' },
        { days: 'Thursday', startHour: '08:00', endHour: '09:00' }
      ],
      trainerName: "Ahmed"
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
      groups: [
        { days: 'Friday', startHour: '17:00', endHour: '18:00' },
        { days: 'Sunday', startHour: '09:00', endHour: '10:00' }
      ],
      trainerName: "Ahmed"
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const classId = Number(this.route.snapshot.paramMap.get('classId'));
    const classData = this.classes.find(c => c.classId === classId);

    if (classData) {
      this.className = classData.className;
      this.sessions = classData.sessions;
      this.status = classData.status;
      this.description = classData.description;
      this.trainerName = classData.trainerName;

      this.equipment = classData.equipment.split(', ').map(item => item.trim());
      this.exercise = classData.exercise.split(', ').map(item => item.trim());
      this.exerciseList = this.exercise;

      this.equipment.forEach(item => {
        this.selectedEquipment[item] = true;
      });

      this.exercise.forEach(item => {
        this.selectedExercises[item] = true;
      });
      

      this.groups = classData.groups.map((session: SessionInfo) => ({
        days: session.days,
        startHour: session.startHour,
        endHour: session.endHour,
        date: session.date || '',
         }));
    }
  }

  validateHours(startHour: string, endHour: string): boolean {
    if (!startHour || !endHour) {
      return true;
    }
    return new Date(`1970-01-01T${startHour}`) < new Date(`1970-01-01T${endHour}`);
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
      trainerName: this.trainerName
    });
    this.router.navigate(['/admin/classes']);
  }

  cancel() {
    this.router.navigate(['/admin/classes']);
  }
}
