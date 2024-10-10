import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-do-review',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './do-review.component.html',
  styleUrl: './do-review.component.css'
})
export class DoReviewComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
  ) {
    // this.groupTrainers();
    // this.setProfileImage();
  }

  trainers: any;
  errorMessage: string | null = null;
  groupedTrainers: any[] = [];
  reviewErrorMessages: { [userId: number]: string } = {};
  validMessages: { [userId: number]: string } = {};

  currentSlide: number = 0;

  ngOnInit(): void {
    this.trainers = this.sidebarService.getSelectedData();
    console.log(this.trainers);
    if (!this.trainers) {
      this.getTrainers();
      return;
    }
    this.groupTrainers();
    this.setProfileImage();
  }

  getTrainers() {
    this.errorMessage = null; // Reset the error message

    this.sidebarService.indexMyTrainers().subscribe({
      next: (response) => {
        this.trainers = response.trainers;
        console.log(this.trainers);
        this.groupTrainers();
        this.setProfileImage();
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  groupTrainers() {
    const groupSize = 2;
    for (let i = 0; i < this.trainers.length; i += groupSize) {
      this.groupedTrainers.push(this.trainers.slice(i, i + groupSize));
    }
  }

  setProfileImage() {
    const trainer = this.trainers[0];
    if (!trainer.image || trainer.image === '') {
      trainer.srcImg = trainer.gender === 'female' ? '/female.png' : '/male.png';
    } else {
      trainer.srcImg = trainer.image;
    }
  }

  toggleReview(trainer: any) {
    trainer.showReview = !trainer.showReview;
  }

 

  addReview(userId: string | null, comment: string | null, rate: string | null) {
    let user_id: number = userId ? Number(userId) : 0;
    let rating: number = rate ? Number(rate) : 0;

    const newReview = {
      'user_id': user_id,
      'comments': comment,
      'rating': rating,
    };

    if (user_id) {
      this.sidebarService.doReview(newReview).subscribe({
        next: (response) => {
          console.log(response);
          this.sidebarService.setSelectedData(response);
          this.validMessages[user_id] = "done";
          window.location.href = "/trainee-doReview";
          setTimeout(() => {
            this.validMessages[user_id] = "";
          }, 5000);
        },
        error: (error) => {
          console.log(error);
          if (error.status === 403) {
            if (error.error?.message) {
              Object.keys(error.error.message).forEach(key => {
                this.reviewErrorMessages[user_id] = error.error.message[key];
                setTimeout(() => {
                  this.reviewErrorMessages[user_id] = "";
                }, 5000);
              });
            }
          } else if (error.status === 401) {
            this.router.navigate(['login']);
          }
          else {
            this.reviewErrorMessages[user_id] = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    }
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
