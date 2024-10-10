import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-all-classes',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-all-classes.component.html',
  styleUrl: './admin-all-classes.component.css'
})
export class AdminAllClassesComponent {

  classes: any;
  errorMessage: string | null = null;
  dataFlag = false;
  // Array to hold the grouped classes for the slider
  groupedClasses: any[] = [];
  currentSlide: number = 0;
  constructor(private adminService: AdminService, private router: Router) {
  }
  
  ngOnInit() {
    this.classes = this.adminService.getSelectedData();
    this.dataFlag = true;
    if (!this.classes) {
      this.allClasses();
      console.log(this.classes);
      this.groupClasses();
      return;
    }
    this.groupClasses(); // Group classes into sets for the carousel
  }

  //reload
  allClasses(){
    this.errorMessage = null; // Reset the error message 
    this.adminService.indexClasses().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response.gymclassData);
        this.classes = response.gymclassData;
        this.groupClasses();
        this.router.navigate(['/admin-allClasses']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-allClasses']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
  // Array containing class data
  // classes = [
  //   {
  //     className: 'Yoga Class',
  //     classId: 1,
  //     sessions: 5,
  //     status: 'active',
  //     equipment: 'Yoga Mat, Resistance Bands',
  //     description: 'A yoga class focused on flexibility and balance.',
  //     totalNoOfSession: 8,
  //     exercise: 'Downward Dog, Warrior Pose, Tree Pose',
  //     sessionsInfo: [
  //       { days: 'Monday', hours: '10:00 AM - 11:00 AM' },
  //       { days: 'Thursday', hours: '06:00 PM - 07:00 PM' }
  //     ],
  //     trainerName: "Ahmed"
  //   },
  //   {
  //     className: 'Pilates Class',
  //     classId: 2,
  //     sessions: 6,
  //     status: 'inactive',
  //     equipment: 'Pilates Ring, Exercise Ball',
  //     description: 'Improve core strength and flexibility with Pilates.',
  //     totalNoOfSession: 10,
  //     exercise: 'Hundred, Leg Circles, Roll Up',
  //     sessionsInfo: [
  //       { days: 'Wednesday', hours: '8:00 AM - 9:00 AM' },
  //       { days: 'Friday', hours: '5:00 PM - 6:00 PM' }
  //     ],
  //     trainerName: "Ahmed"
  //   },
  //   {
  //     className: 'Zumba Class',
  //     classId: 3,
  //     sessions: 4,
  //     status: 'active',
  //     equipment: 'None',
  //     description: 'A fun and energetic dance workout to keep you moving.',
  //     totalNoOfSession: 12,
  //     exercise: 'Salsa, Merengue, Cumbia',
  //     sessionsInfo: [
  //       { days: 'Tuesday', hours: '7:00 PM - 8:00 PM' },
  //       { days: 'Saturday', hours: '10:00 AM - 11:00 AM' }
  //     ],
  //     trainerName: "Ahmed"
  //   },
  //   {
  //     className: 'HIIT Class',
  //     classId: 4,
  //     sessions: 8,
  //     status: 'active',
  //     equipment: 'Dumbbells, Resistance Bands',
  //     description: 'High-intensity interval training to boost cardio and strength.',
  //     totalNoOfSession: 15,
  //     exercise: 'Burpees, Mountain Climbers, Jump Squats',
  //     sessionsInfo: [
  //       { days: 'Monday', hours: '6:00 AM - 7:00 AM' },
  //       { days: 'Wednesday', hours: '6:00 PM - 7:00 PM' }
  //     ],
  //     trainerName: "Ahmed"
  //   },
  //   {
  //     className: 'Spinning Class',
  //     classId: 5,
  //     sessions: 7,
  //     status: 'inactive',
  //     equipment: 'Spinning Bike',
  //     description: 'Indoor cycling workout for endurance and strength.',
  //     totalNoOfSession: 10,
  //     exercise: 'Hill Climb, Sprint, Interval Training',
  //     sessionsInfo: [
  //       { days: 'Tuesday', hours: '6:30 PM - 7:30 PM' },
  //       { days: 'Thursday', hours: '7:00 AM - 8:00 AM' }
  //     ]
  //   },
  //   {
  //     className: 'CrossFit Class',
  //     classId: 6,
  //     sessions: 10,
  //     status: 'active',
  //     equipment: 'Kettlebells, Pull-up Bar',
  //     description: 'Strength and conditioning program with varied movements.',
  //     totalNoOfSession: 20,
  //     exercise: 'Deadlifts, Pull-ups, Box Jumps',
  //     sessionsInfo: [
  //       { days: 'Friday', hours: '5:00 PM - 6:30 PM' },
  //       { days: 'Sunday', hours: '9:00 AM - 10:30 AM' }
  //     ],
  //     trainerName: "Ahmed"
  //   }
  // ];

  // logClassId(classId: number) {
  //   console.log('Class ID:', classId);
  // }

  // Function to track each class by classId for performance optimization
  trackByClassId(index: number, classObj: any) {
    return classObj.id;
  }

  // Function to group classes for display in slides
  groupClasses() {
    const groupSize = 1;  // Group size (1 class per group)
    if (this.classes && this.classes.length) {
    for (let i = 0; i < this.classes.length; i += groupSize) {
      this.groupedClasses.push(this.classes.slice(i, i + groupSize));  // Grouping the classes
    }
  }
  }

  formatTime(time: string): string {
    return time.substring(0, 5);
  }

  // Function to go to the previous slide
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  // Function to go to the next slide
  nextSlide() {
    if (this.currentSlide < this.groupedClasses.length - 1) {
      this.currentSlide++;
    }
  }
}
