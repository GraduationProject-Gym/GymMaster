import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule/schedule.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private scheduleService: ScheduleService, private router: Router) {}

  schedule: any;
  groupedSchedules: any[] = [];
  errorMessage: string | null = null;
  dataFlag = false;
  
  categories = [
    {name:'Strength Training',description:' Strength training focuses on increasing muscle strength and mass through weight lifting and resistance exercises. This includes exercises like squats, deadlifts, and bench presses, aiming to improve overall physical strength and enhance the ability to perform daily activities more effectively.'},
    {name:'Cardio',description:' Cardio exercises focus on improving cardiovascular health by increasing the heart rate. This includes activities like running, cycling, and swimming.The goal is to boost physical endurance, enhance circulation, and help maintain a healthy weight.'},
    {name:'Flexibility & Mobility',description:' Flexibility and mobility exercises focus on improving the range of motion of joints and muscles.This includes stretching, yoga, and balance exercises. These exercises help reduce the risk of injury,improve movement, and increase overall physical comfort.'},
    {name:'Recovery & Rehabilitation',description:' Recovery and rehabilitation focus on helping the body recover after intense workouts or injuries.This includes activities like massage, relaxation exercises, and gentle stretching.The aim is to restore strength and flexibility,alleviate pain, and improve overall performance.'},

  ]

  ngOnInit() {
    this.dataFlag = true;
    if (!this.schedule) {
      this.allSchedules();
      console.log(this.schedule);
      return;
    }
  }

  // Load all schedules from backend
  allSchedules() {
    this.errorMessage = null; // Reset the error message
    this.scheduleService.indexSchedules().subscribe({
      next: (response) => {
        console.log(response);
        this.schedule = response;
        this.groupSchedules(); // Group schedules by day
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/home']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Group schedules by 'nameDay'
  groupSchedules() {
    const grouped = this.schedule.reduce((acc: any, curr: any) => {
      const day = curr.nameDay;
  
      if (!acc[day]) {
        acc[day] = [];
      }
  
      // Format session_start and session_end to the desired format
      curr.session_start = this.formatTime(curr.session_start);
      curr.session_end = this.formatTime(curr.session_end);
  
      acc[day].push(curr);
      return acc;
    }, {});
  
    this.groupedSchedules = Object.keys(grouped).map(day => ({
      nameDay: day,
      schedules: grouped[day]
    }));
  }
  
  // Function to format time strings ("09:00:00") to "09:00 AM"
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = (+hours % 12) || 12; // Convert to 12-hour format
    const ampm = +hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    
    // Format hour with leading zero if needed
    const formattedHour = (hour < 10 ? '0' : '') + hour;
  
    return `${formattedHour}:${minutes} ${ampm}`;
  }
  
    
}

