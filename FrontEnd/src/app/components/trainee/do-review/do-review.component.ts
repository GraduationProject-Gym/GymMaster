import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-do-review',
  standalone: true,
  imports: [CommonModule, FormsModule,SidebarComponent],
  templateUrl: './do-review.component.html',
  styleUrl: './do-review.component.css'
})
export class DoReviewComponent {
    @ViewChild('carousel', { static: true }) carousel!: ElementRef;

    trainers: any[] = [
      {
        name: 'SANDY SAMIR1',
        image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
        showReview: false,
        Reviews: [
          { date: '2024-09-10', comment: 'Great session!', rate: 5 },
          { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1 }
      },  {
        name: 'SANDY SAMIR2',
        image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
        showReview: false,
        Reviews: [
          { date: '2024-09-10', comment: 'Great session!', rate: 5 },
          { date: '2024-09-12',comment: 'Missed the class', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1 }
      },  {
        name: 'SANDY SAMIRnm3',
        image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
        showReview: false,
        Reviews: [
          { date: '',  comment: '', rate: 0 },
          { date: '',comment: '', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1 }
      },  {
        name: 'SANDY SAMIRww4',
        image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
        showReview: false,
        Reviews: [
          { date: '2024-09-10', comment: 'Great session!', rate: 5 },
          { date: '2024-09-12', comment: 'Missed the class', rate: 0 }
        ],
        tempReview: { comment: '', rate: 1 }
      },
    ];

    groupedTrainers: any[] = [];
    currentSlide: number = 0;

    constructor() {
      this.groupTrainers();
    }

    groupTrainers() {
      const groupSize = 2;
      for (let i = 0; i < this.trainers.length; i += groupSize) {
        this.groupedTrainers.push(this.trainers.slice(i, i + groupSize));
      }
    }

    toggleReview(trainer: any) {
      trainer.showReview = !trainer.showReview;
    }

      addReview(trainer: any) {
      const newReview = {
        date: new Date().toISOString().split('T')[0],
        attendens: 'Present',
        comment: trainer.tempReview.comment,
        rate: trainer.tempReview.rate
      };
      trainer.Reviews.push(newReview);
      trainer.tempReview = { comment: '', rate: 1 };
    }

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateCarousel();
      }
    }

    nextSlide() {
      if (this.currentSlide < this.groupedTrainers.length - 1) {
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
