  import { Component } from '@angular/core';
  import { HeaderComponent } from '../header/header.component';
  // import { RegistrationComponent } from '../registration/registration.component';
  // import { LoginComponent } from '../login/login.component';
  import { RouterModule } from '@angular/router';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [HeaderComponent,
      // RegistrationComponent,
      // LoginComponent,
      RouterModule ,
      CommonModule

    ],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
  })
  export class LandingPageComponent {


    schedule = [
      {
        day: 'Monday',
        classes: [
          { name: 'Yoga', trainer: 'John Doe', startHour: '9:00 AM', endHour:'10:00AM' , id:1},
          { name: 'Pilates', trainer: 'Jane Doe', startHour: '11:00 AM', endHour:'12:00 PM' , id:3 },
          { name: 'Crossfit', trainer: 'Mike Smith',startHour: '1:00 PM', endHour:'2:00 PM', id:4 }
        ]
      },
      {
        day: 'Tuesday',
        classes: [
          { name: 'Zumba', trainer: 'Emily Davis', startHour: '9:00 AM', endHour:'10:AM', id:5},
          { name: 'Spinning', trainer: 'Luke Scott', startHour: '9:00 AM', endHour:'10:AM', id:6},
          { name: 'Boxing', trainer: 'Chris Lee', startHour: '9:00 AM', endHour:'10:AM' , id:7}
        ]
      }
    ];


    categories = [
      {name:'Strength Training',description:' Strength training focuses on increasing muscle strength and mass through weight lifting and resistance exercises. This includes exercises like squats, deadlifts, and bench presses, aiming to improve overall physical strength and enhance the ability to perform daily activities more effectively.'},
      {name:'Cardio',description:' Cardio exercises focus on improving cardiovascular health by increasing the heart rate. This includes activities like running, cycling, and swimming.The goal is to boost physical endurance, enhance circulation, and help maintain a healthy weight.'},
      {name:'Flexibility & Mobility',description:' Flexibility and mobility exercises focus on improving the range of motion of joints and muscles.This includes stretching, yoga, and balance exercises. These exercises help reduce the risk of injury,improve movement, and increase overall physical comfort.'},
      {name:'Recovery & Rehabilitation',description:' Recovery and rehabilitation focus on helping the body recover after intense workouts or injuries.This includes activities like massage, relaxation exercises, and gentle stretching.The aim is to restore strength and flexibility,alleviate pain, and improve overall performance.'},

    ]
  }

