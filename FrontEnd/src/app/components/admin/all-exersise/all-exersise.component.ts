import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-all-exersise',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdminSidebarComponent],
  templateUrl: './all-exersise.component.html',
  styleUrls: ['./all-exersise.component.css']
})
export class AllExersiseComponent {

  // Access to the carousel element in the template
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  
  // List of exersise data
  exersises: any[] = [
    {
      name: 'Push Up',
      category: 'Strength',
      no_of_times: 15
    },
    {
      name: 'Jumping Jacks',
      category: 'Cardio',
      no_of_times: 30
    },
    {
      name: 'Push Up',
      category: 'Strength',
      no_of_times: 15
    },
    {
      name: 'Jumping Jacks',
      category: 'Cardio',
      no_of_times: 30
    },
  ];

  // Grouped Exersise for displaying in the carousel
  groupedExersises: any[] = [];
  currentSlide: number = 0;

  // Constructor to initialize the component and group the Exersises
  constructor() {
    this.groupExercises();
  }

  // Group exercises into sets of 3 for carousel slides
  groupExercises() {
    const groupSize = 3;
    for (let i = 0; i < this.exersises.length; i += groupSize) {
      this.groupedExersises.push(this.exersises.slice(i, i + groupSize));
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
    if (this.currentSlide < this.groupedExersises.length - 1) {
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



}
