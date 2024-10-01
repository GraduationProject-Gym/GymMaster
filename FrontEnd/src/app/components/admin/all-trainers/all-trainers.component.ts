import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-trainers',
  standalone: true,
  imports: [AdminSidebarComponent,CommonModule,FormsModule,
    RouterModule ],
  templateUrl: './all-trainers.component.html',
  styleUrl: './all-trainers.component.css'
})
export class AllTrainersComponent {


  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  trainees: any[] = [
  {
      image: '/assets/Woman athlete exercising with kettlebell.jfif',
      name: 'John Doe',
      age:23,
      email:"sandy23@gmail.com",
      phone:"01271024421",
      address:"Asyut",
      gender:"male",
    },  {
      image: '/assets/Woman athlete exercising with kettlebell.jfif',
      name: 'John Doe',
      age:23,
      email:"sandy23@gmail.com",
      phone:"01271024421",
      address:"Asyut",
      gender:"male",
    },  {
      image: '/assets/Woman athlete exercising with kettlebell.jfif',
      name: 'John Doe',
      age:23,
      email:"sandy23@gmail.com",
      phone:"01271024421",
      address:"Asyut",
      gender:"male",
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

  // createReport(){}

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

