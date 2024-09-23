// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-trainees',
//   standalone: true,
//   imports: [],
//   templateUrl: './trainees.component.html',
//   styleUrl: './trainees.component.css'
// })
// export class TraineesComponent {


//   Trainee: any[] = [];
//     trainees: Trainee[] = [
//       {
//         name: 'SANDY SAMIR',
//         trainerName: 'Ahmed',
//         className: 'Yoga',
//         sessionsAttended: 4,
//         membership: 'VIP',
//         subscription: 'Month',
//         review: 'Good Trainer',
//         rating: 3,
//         image: '/path/to/image1.jfif',
//       },
//       {
//         name: 'JOHN DOE',
//         trainerName: 'Mohamed',
//         className: 'Pilates',
//         sessionsAttended: 5,
//         membership: 'Standard',
//         subscription: 'Year',
//         review: 'Excellent Trainer',
//         rating: 5,
//         image: '/path/to/image2.jfif',
//       },
//       // يمكنك إضافة المزيد من المتدربين هنا
//     ];
//   }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.css']
})
export class TraineesComponent {
  trainees = [
    {
      name: 'SANDY SAMIR',
      trainerName: 'Ahmed',
      className: 'Yoga',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      review: 'Good Trainer',
      rating: 3,
      image: '/Woman athlete exercising with kettlebell.jfif',
    },
    {
      name: 'JOHN DOE',
      trainerName: 'Mohamed',
      className: 'Pilates',
      sessionsAttended: 5,
      membership: 'Standard',
      subscription: 'Year',
      review: 'Excellent Trainer',
      rating: 5,
      image: '/Woman athlete exercising with kettlebell.jfif',
    },
    {
      name: 'JANE SMITH',
      trainerName: 'Amira',
      className: 'Zumba',
      sessionsAttended: 3,
      membership: 'VIP',
      subscription: 'Month',
      review: 'Fun Class',
      rating: 4,
      image: '/Woman athlete exercising with kettlebell.jfif',
    },
    {
      name: 'MIKE JONES',
      trainerName: 'Tamer',
      className: 'CrossFit',
      sessionsAttended: 6,
      membership: 'Standard',
      subscription: 'Month',
      review: 'Challenging but worth it',
      rating: 5,
      image: '/Woman athlete exercising with kettlebell.jfif',
    },
    {
      name: 'LUCY BROWN',
      trainerName: 'Sara',
      className: 'Spinning',
      sessionsAttended: 2,
      membership: 'Standard',
      subscription: 'Week',
      review: 'Great Energy',
      rating: 4,
      image: '/Woman athlete exercising with kettlebell.jfif',
    },
    {
      name: 'CHRIS GREEN',
      trainerName: 'Hossam',
      className: 'Boxing',
      sessionsAttended: 7,
      membership: 'VIP',
      subscription: 'Year',
      review: 'Best Trainer',
      rating: 5,
      image: '/Woman athlete exercising with kettlebell.jfif',
    },
    {
    name: 'SANDY SAMIR',
    trainerName: 'Ahmed',
    className: 'Yoga',
    sessionsAttended: 4,
    membership: 'VIP',
    subscription: 'Month',
    review: 'Good Trainer',
    rating: 3,
    image: '/Woman athlete exercising with kettlebell.jfif',
  },
  {
    name: 'JOHN DOE',
    trainerName: 'Mohamed',
    className: 'Pilates',
    sessionsAttended: 5,
    membership: 'Standard',
    subscription: 'Year',
    review: 'Excellent Trainer',
    rating: 5,
    image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
  },
  {
    name: 'JANE SMITH',
    trainerName: 'Salma',
    className: 'Zumba',
    sessionsAttended: 6,
    membership: 'VIP',
    subscription: 'Month',
    review: 'Very Energetic',
    rating: 4,
    image: '/Woman athlete exercising with kettlebell.jfif',
  },
  {
    name: 'ALY AHMED',
    trainerName: 'Kareem',
    className: 'CrossFit',
    sessionsAttended: 8,
    membership: 'Gold',
    subscription: 'Year',
    review: 'Motivating Trainer',
    rating: 5,
    image: '/Woman athlete exercising with kettlebell.jfif',
  },
  {
    name: 'LARA GEORGE',
    trainerName: 'Nadia',
    className: 'Aerobics',
    sessionsAttended: 3,
    membership: 'Standard',
    subscription: 'Month',
    review: 'Fun Classes',
    rating: 4,
    image: '/Woman athlete exercising with kettlebell.jfif',
  },
  {
    name: 'MIKE BROWN',
    trainerName: 'Youssef',
    className: 'Boxing',
    sessionsAttended: 7,
    membership: 'Platinum',
    subscription: 'Year',
    review: 'Great Technique',
    rating: 5,
    image: '/Woman athlete exercising with kettlebell.jfif',
  },
  {
    name: 'Amal',
    trainerName: 'Youssef',
    className: 'Boxing',
    sessionsAttended: 7,
    membership: 'Platinum',
    subscription: 'Year',
    review: 'Great Technique',
    rating: 3,
    image: '/Woman athlete exercising with kettlebell.jfif',
  }
  ];
}

