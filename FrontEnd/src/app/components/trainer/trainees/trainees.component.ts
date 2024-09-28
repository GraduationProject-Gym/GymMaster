import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trainees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.css']
})
export class TraineesComponent {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  trainees: any[] = [
    {
      name: 'SANDY SAMIR1',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      image: '/assets/Woman athlete exercising with kettlebell.jfif',
      showReview: false,
      Reviews: [
        { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
        { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
      ],
      tempReview: { comment: '', rate: 1 }
    },  {
      name: 'SANDY SAMIR2',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      image: '/assets/Woman athlete exercising with kettlebell.jfif',
      showReview: false,
      Reviews: [
        { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
        { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
      ],
      tempReview: { comment: '', rate: 1 }
    },  {
      name: 'SANDY SAMIRnm3',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
      showReview: false,
      Reviews: [
        { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
        { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
      ],
      tempReview: { comment: '', rate: 1 }
    },  {
      name: 'SANDY SAMIRww4',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
      showReview: false,
      Reviews: [
        { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
        { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
      ],
      tempReview: { comment: '', rate: 1 }
    },  {
      name: 'SANDY SAMIRmm5',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
      showReview: false,
      Reviews: [
        { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
        { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
      ],
      tempReview: { comment: '', rate: 1 }
    },  {
      name: 'SANDY SAMIRyyy6',
      sessionsAttended: 4,
      membership: 'VIP',
      subscription: 'Month',
      image: '/assets/Woman athlete exercising with kettlebell.jfif',
      showReview: false,
      Reviews: [
        { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
        { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
      ],
      tempReview: { comment: '', rate: 1 }
    },
  ];

  groupedTrainees: any[] = [];
  currentSlide: number = 0;

  constructor() {
    this.groupTrainees();
  }

  groupTrainees() {
    const groupSize = 3;
    for (let i = 0; i < this.trainees.length; i += groupSize) {
      this.groupedTrainees.push(this.trainees.slice(i, i + groupSize));
    }
  }

  toggleReview(trainee: any) {
    trainee.showReview = !trainee.showReview;
  }

    addReview(trainee: any) {
    const newReview = {
      date: new Date().toISOString().split('T')[0],
      attendens: 'Present',
      comment: trainee.tempReview.comment,
      rate: trainee.tempReview.rate
    };
    trainee.Reviews.push(newReview);
    trainee.tempReview = { comment: '', rate: 1 };
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarousel();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.groupedTrainees.length - 1) {
      this.currentSlide++;
      this.updateCarousel();
    }
  }


  updateCarousel() {
    const carouselItems = this.carousel.nativeElement.querySelectorAll('.carousel-item');
    carouselItems.forEach((item: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void; }; }, index: number) => {
      item.classList.remove('active');
      if (index === this.currentSlide) {
        item.classList.add('active');
      }
    });
  }

}
