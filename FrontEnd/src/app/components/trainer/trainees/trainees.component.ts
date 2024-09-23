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


  // comments: any[text: string; date: string; ] = [];

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
      comments: [] as { text: string; date: string; }[],
      showCommentBox: false,
      newComment: ''
    },
  //   {
  //     name: 'JOHN DOE',
  //     trainerName: 'Mohamed',
  //     className: 'Pilates',
  //     sessionsAttended: 5,
  //     membership: 'Standard',
  //     subscription: 'Year',
  //     review: 'Excellent Trainer',
  //     rating: 5,
  //     image: '/Woman athlete exercising with kettlebell.jfif',
  //     showCommentBox: false,
  //     newComment: ''
  //   },
  //   {
  //     name: 'JANE SMITH',
  //     trainerName: 'Amira',
  //     className: 'Zumba',
  //     sessionsAttended: 3,
  //     membership: 'VIP',
  //     subscription: 'Month',
  //     review: 'Fun Class',
  //     rating: 4,
  //     image: '/Woman athlete exercising with kettlebell.jfif',
  //     showCommentBox: false,
  //     newComment: ''
  //   },
  //   {
  //     name: 'MIKE JONES',
  //     trainerName: 'Tamer',
  //     className: 'CrossFit',
  //     sessionsAttended: 6,
  //     membership: 'Standard',
  //     subscription: 'Month',
  //     review: 'Challenging but worth it',
  //     rating: 5,
  //     image: '/Woman athlete exercising with kettlebell.jfif',
  //     showCommentBox: false,
  //     newComment: ''
  //   },
  //   {
  //     name: 'LUCY BROWN',
  //     trainerName: 'Sara',
  //     className: 'Spinning',
  //     sessionsAttended: 2,
  //     membership: 'Standard',
  //     subscription: 'Week',
  //     review: 'Great Energy',
  //     rating: 4,
  //     image: '/Woman athlete exercising with kettlebell.jfif',
  //     showCommentBox: false,
  //     newComment: ''
  //   },
  //   {
  //     name: 'CHRIS GREEN',
  //     trainerName: 'Hossam',
  //     className: 'Boxing',
  //     sessionsAttended: 7,
  //     membership: 'VIP',
  //     subscription: 'Year',
  //     review: 'Best Trainer',
  //     rating: 5,
  //     image: '/Woman athlete exercising with kettlebell.jfif',
  //     showCommentBox: false,
  //     newComment: ''
  //   },
  //   {
  //   name: 'SANDY SAMIR',
  //   trainerName: 'Ahmed',
  //   className: 'Yoga',
  //   sessionsAttended: 4,
  //   membership: 'VIP',
  //   subscription: 'Month',
  //   review: 'Good Trainer',
  //   rating: 3,
  //   image: '/Woman athlete exercising with kettlebell.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // },
  // {
  //   name: 'JOHN DOE',
  //   trainerName: 'Mohamed',
  //   className: 'Pilates',
  //   sessionsAttended: 5,
  //   membership: 'Standard',
  //   subscription: 'Year',
  //   review: 'Excellent Trainer',
  //   rating: 5,
  //   image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // },
  // {
  //   name: 'JANE SMITH',
  //   trainerName: 'Salma',
  //   className: 'Zumba',
  //   sessionsAttended: 6,
  //   membership: 'VIP',
  //   subscription: 'Month',
  //   review: 'Very Energetic',
  //   rating: 4,
  //   image: '/Woman athlete exercising with kettlebell.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // },
  // {
  //   name: 'ALY AHMED',
  //   trainerName: 'Kareem',
  //   className: 'CrossFit',
  //   sessionsAttended: 8,
  //   membership: 'Gold',
  //   subscription: 'Year',
  //   review: 'Motivating Trainer',
  //   rating: 5,
  //   image: '/Woman athlete exercising with kettlebell.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // },
  // {
  //   name: 'LARA GEORGE',
  //   trainerName: 'Nadia',
  //   className: 'Aerobics',
  //   sessionsAttended: 3,
  //   membership: 'Standard',
  //   subscription: 'Month',
  //   review: 'Fun Classes',
  //   rating: 4,
  //   image: '/Woman athlete exercising with kettlebell.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // },
  // {
  //   name: 'MIKE BROWN',
  //   trainerName: 'Youssef',
  //   className: 'Boxing',
  //   sessionsAttended: 7,
  //   membership: 'Platinum',
  //   subscription: 'Year',
  //   review: 'Great Technique',
  //   rating: 5,
  //   image: '/Woman athlete exercising with kettlebell.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // },
  // {
  //   name: 'Amal',
  //   trainerName: 'Youssef',
  //   className: 'Boxing',
  //   sessionsAttended: 7,
  //   membership: 'Platinum',
  //   subscription: 'Year',
  //   review: 'Great Technique',
  //   rating: 3,
  //   image: '/Woman athlete exercising with kettlebell.jfif',
  //   showCommentBox: false,
  //   newComment: ''
  // }
  ];


// submitComment(index: number) {
//   console.log('New Comment for', this.trainees[index].name + ':', this.trainees[index].newComment);
//   this.trainees[index].newComment = '';
//   this.trainees[index].showCommentBox = false;
// }



// submitComment(index: number) {
//   if (this.trainees[index].newComment.trim() !== '') {
//     this.trainees[index].comments += this.trainees[index].newComment + '\n';
//   }

//   this.trainees[index].newComment = '';
//   this.trainees[index].showCommentBox = false;
// }
// }

toggleCommentBox(index: number) {
  this.trainees[index].showCommentBox = !this.trainees[index].showCommentBox;
}

submitComment(index: number) {
  if (this.trainees[index].newComment.trim() !== '') {
    const currentDate = new Date().toLocaleString();
    const commentWithDate = {
      text: this.trainees[index].newComment,
      date: currentDate
    };
    this.trainees[index].comments.push(commentWithDate);
  }
  this.trainees[index].newComment = '';
  this.trainees[index].showCommentBox = false;
}


}
