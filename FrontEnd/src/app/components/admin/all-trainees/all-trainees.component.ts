import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-trainees',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './all-trainees.component.html',
  styleUrl: './all-trainees.component.css'
})
export class AllTraineesComponent {

  // Access to the carousel element in the template
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  // List of trainers data
  trainees: any[] = [
      {
        name: 'Jane Smith',
        id: 6,
        srcImg: '/female.png',
        age: 28,
        email: "jane28@gmail.com",
        phone: "01023456789",
        address: "Cairo",
        gender: "female",
        classes: ["pilates", "yoga"],
        membership: "Gold",
        subscription: "Annual",
      },
      {
        name: 'Michael Johnson',
        id: 7,
        srcImg: '/male.png',
        age: 30,
        email: "mike30@gmail.com",
        phone: "01123456789",
        address: "Alexandria",
        gender: "male",
        classes: ["zomba", "crossfit"],
        membership: "Silver",
        subscription: "Monthly",
      },
      {
        name: 'Sara Connor',
        id: 8,
        srcImg: '/female.png',
        age: 26,
        email: "sara26@gmail.com",
        phone: "01234567890",
        address: "Giza",
        gender: "female",
        classes: ["yoga", "box"],
        membership: "Platinum",
        subscription: "Quarterly",
      },
      {
        name: 'James Bond',
        id: 9,
        srcImg: '/male.png',
        age: 35,
        email: "bond35@gmail.com",
        phone: "01012345678",
        address: "Luxor",
        gender: "male",
        classes: ["martial arts", "zomba"],
        membership: "Gold",
        subscription: "Annual",
      },
      {
        name: 'Emma Watson',
        id: 10,
        srcImg: '/female.png',
        age: 24,
        email: "emma24@gmail.com",
        phone: "01198765432",
        address: "Fayoum",
        gender: "female",
        classes: ["pilates", "yoga"],
        membership: "Silver",
        subscription: "Monthly",
      }
    ];


  // Grouped trainers for displaying in the carousel
  groupedTrainees: any[] = [];
  currentSlide: number = 0;

  // Constructor to initialize the component and group the trainers
  constructor() {
    this.groupTrainees(); // Group trainers into sets for the carousel
    this.setProfileImage(); // Set default profile images based on gender
  }

  // Group trainers into sets of 3 for carousel slides
  groupTrainees() {
    const groupSize = 2; // Number of trainers per slide
    for (let i = 0; i < this.trainees.length; i += groupSize) {
      this.groupedTrainees.push(this.trainees.slice(i, i + groupSize));
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
    if (this.currentSlide < this.groupedTrainees.length - 1) {
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
    this.trainees.forEach(trainee => {
      if (!trainee.srcImg) {
        // If no image is provided, use default based on gender
        trainee.srcImg = trainee.gender === 'female' ? "/female.png" : "/male.png";
      }
    });
  }
}

