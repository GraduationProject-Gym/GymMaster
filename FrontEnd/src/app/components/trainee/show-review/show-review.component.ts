import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-review',
  standalone: true,
  imports: [CommonModule, FormsModule,SidebarComponent],
  templateUrl: './show-review.component.html',
  styleUrl: './show-review.component.css'
})
export class ShowReviewComponent implements OnInit{
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  constructor(private sidebarService: SidebarService, private router: Router) {
    // this.groupReviews();
  }

  // List of my reviews data
  allReviews: any;
  errorMessage: string | null = null;
  dataFlag = false;
  groupedReviews: any[] = [];
  currentSlide: number = 0;

  ngOnInit() {
    this.allReviews = this.sidebarService.getReviews();
    this.dataFlag = true;
    console.log('my data:',this.allReviews);

    if (!this.allReviews) {
      this.showMyReviews();
      return;
    }
    this.groupReviews(); // Group reviews into sets for the carousel
  }
  // show my reviews
  showMyReviews() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexMyReviews().subscribe({
      next: (response) => {
        this.sidebarService.setReviews(response.joinedClasses);
        this.allReviews = response.joinedClasses;
        console.log(this.allReviews);
        this.groupReviews()
        // window.location.href = this.router.serializeUrl(this.router.createUrlTree(['trainee-showReviews']));
        // console.log(response);
        this.router.navigate(['trainee-showReviews']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
  // allReviews: any[] = [
  //       {
  //         trainerName: 'SANDY SAMIR1',
  //         reviews: [
  //           { date: '2024-09-10', comment: 'Great session!mmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmm mmmmmmmmmmm', rate: 5 },
  //           { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
  //         ],
  //       },    {
  //         trainerName: 'SANDY SAMIR2',
  //         reviews: [
  //           { date: '2024-09-10', comment: 'Great session!', rate: 5 },
  //           { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
  //         ],
  //       }, {
  //         trainerName: 'SANDY SAMIR3',
  //         reviews: [
  //           { date: '2024-09-10', comment: 'Great session!', rate: 5 },
  //           { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
  //         ],
  //       },    {
  //         trainerName: 'SANDY SAMIR4',
  //         reviews: [
  //           { date: '2024-09-10', comment: 'Great session!', rate: 5 },
  //           { date: '2024-09-12',  comment: 'Missed the class', rate: 0 }
  //         ],
  //       },
  //       ]


    groupReviews() {
      const groupSize = 2;
      if (this.allReviews && this.allReviews.length) {
        console.log('all',this.allReviews);
      for (let i = 0; i < this.allReviews.length; i += groupSize) {
        this.groupedReviews.push(this.allReviews.slice(i, i + groupSize));

      }
      console.log('group',this.groupedReviews);

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

