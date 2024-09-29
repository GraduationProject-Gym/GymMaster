import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-show-review',
  standalone: true,
  imports: [CommonModule, FormsModule,SidebarComponent],
  templateUrl: './show-review.component.html',
  styleUrl: './show-review.component.css'
})
export class ShowReviewComponent {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  allReviews: any[] = [
        {
          trainerName: 'SANDY SAMIR1',
          reviews: [
            { date: '2024-09-10', comment: 'Great session!mmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmm mmmmmmmmmmm', rate: 5 },
            { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
          ],
        },    {
          trainerName: 'SANDY SAMIR2',
          reviews: [
            { date: '2024-09-10', comment: 'Great session!', rate: 5 },
            { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
          ],
        }, {
          trainerName: 'SANDY SAMIR3',
          reviews: [
            { date: '2024-09-10', comment: 'Great session!', rate: 5 },
            { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
          ],
        },    {
          trainerName: 'SANDY SAMIR4',
          reviews: [
            { date: '2024-09-10', comment: 'Great session!', rate: 5 },
            { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
          ],
        },
        ]


    groupedReviews: any[] = [];
    currentSlide: number = 0;

    constructor() {
      this.groupReviews();
    }

    groupReviews() {
      const groupSize = 2;
      for (let i = 0; i < this.allReviews.length; i += groupSize) {
        this.groupedReviews.push(this.allReviews.slice(i, i + groupSize));
      }
    }

    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.updateCarousel();
      }
    }

    nextSlide() {
      if (this.currentSlide < this.groupedReviews.length - 1) {
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

