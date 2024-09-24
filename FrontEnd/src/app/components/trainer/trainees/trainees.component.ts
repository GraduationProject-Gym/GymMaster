import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainees',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.css']
})
export class TraineesComponent {
    trainees = [
      {
        name: 'SANDY SAMIR',
        sessionsAttended: 4,
        membership: 'VIP',
        subscription: 'Month',
        image: '/Woman athlete exercising with kettlebell.jfif',
        showReview: false,
        Reviews: [
          { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
          { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1}
      },
      {
        name: 'SANDY SAMIR',
        sessionsAttended: 4,
        membership: 'VIP',
        subscription: 'Month',
        image: '/Woman athlete exercising with kettlebell.jfif',
        showReview: false,
        Reviews: [
          { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
          { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1}
      }, {
        name: 'SANDY SAMIR',
        sessionsAttended: 4,
        membership: 'VIP',
        subscription: 'Month',
        image: '/Woman athlete exercising with kettlebell.jfif',
        showReview: false,
        Reviews: [
          { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
          { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1}
      }
    ];

    toggleReview(index: number) {
      this.trainees[index].showReview = !this.trainees[index].showReview;
    }

    addReview(index: number) {
      // if (this.trainees[index].tempReview.rate < 1 || this.trainees[index].tempReview.rate > 5) {
      //   ('Rating must be between 1 and 5.');
      //   return;
      // }
      const newReview = {
        date: new Date().toISOString().split('T')[0],
        attendens: 'N/A',
        comment: this.trainees[index].tempReview.comment,
        rate: this.trainees[index].tempReview.rate
      };

      this.trainees[index].Reviews.push(newReview);
      this.trainees[index].tempReview = { comment: '', rate: 0 };
    }
  }






