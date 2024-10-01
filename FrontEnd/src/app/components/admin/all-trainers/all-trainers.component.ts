import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-trainers',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './all-trainers.component.html',
  styleUrl: './all-trainers.component.css'
})
export class AllTrainersComponent {

  // Access to the carousel element in the template
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  // List of trainers data
  trainers: any[] = [
    {
      name: 'John Doe1',
      id: 5,
      srcImg: '/male.jfif',
      age: 23,
      email: "sandy23@gmail.com",
      phone: "01271024421",
      address: "Asyut",
      gender: "male",
      class: "yoga",
      cv: '',
    },
    {
      name: 'John Doe2',
      id: 1,
      srcImg: '',
      age: 23,
      email: "sandy23@gmail.com",
      phone: "01271024421",
      address: "Asyut",
      gender: "male",
      class: "yoga",
      cv: '',
    },
    {
      name: 'John Doe1',
      id: 5,
      srcImg: '/male.jfif',
      age: 23,
      email: "sandy23@gmail.com",
      phone: "01271024421",
      address: "Asyut",
      gender: "male",
      class: "yoga",
      cv: '',
    },
    {
      name: 'John Doe2',
      id: 1,
      srcImg: '',
      age: 23,
      email: "sandy23@gmail.com",
      phone: "01271024421",
      address: "Asyut",
      gender: "male",
      class: "yoga",
      cv: '',
    },
  ];

  // Grouped trainers for displaying in the carousel
  groupedTrainers: any[] = [];
  currentSlide: number = 0;

  // Constructor to initialize the component and group the trainers
  constructor() {
    this.groupTrainers(); // Group trainers into sets for the carousel
    this.setProfileImage(); // Set default profile images based on gender
  }

  // Group trainers into sets of 3 for carousel slides
  groupTrainers() {
    const groupSize = 3; // Number of trainers per slide
    for (let i = 0; i < this.trainers.length; i += groupSize) {
      this.groupedTrainers.push(this.trainers.slice(i, i + groupSize));
    }
  }

  // Navigate to the previous carousel slide
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarousel(); // Update the carousel to reflect the change
    }
  }

  // Navigate to the next carousel slide
  nextSlide() {
    if (this.currentSlide < this.groupedTrainers.length - 1) {
      this.currentSlide++;
      this.updateCarousel(); // Update the carousel to reflect the change
    }
  }

  // Update the active carousel item based on the current slide index
  updateCarousel() {
    const carouselItems = this.carousel.nativeElement.querySelectorAll('.carousel-item');
    carouselItems.forEach((item: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void; }; }, index: number) => {
      item.classList.remove('active'); // Remove 'active' class from all items
      if (index === this.currentSlide) {
        item.classList.add('active'); // Add 'active' class to the current slide
      }
    });
  }

  // Set default profile images for trainers without a profile picture
  setProfileImage() {
    this.trainers.forEach(trainer => {
      if (!trainer.srcImg) {
        // If no image is provided, use default based on gender
        trainer.srcImg = trainer.gender === 'female' ? "/female.jfif" : "/male.jfif";
      }
    });
  }
}

