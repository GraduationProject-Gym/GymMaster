import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Add this import
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';  // Import the AdminSidebarComponent

@Component({
  styleUrls: ['./all-equipments.component.css'],
  selector: 'app-all-equipments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,AdminSidebarComponent],  // Include RouterModule
  templateUrl: './all-equipments.component.html',
})

export class AllEquipmentsComponent{

  // Access to the carousel element in the template
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  // List of Equipments data
  equipments: any[] = [
      {
        id: 1,
        name: 'Treadmill',
        used_weight: 120,
        number_of_equipments: 5,
      },
      {
        id: 2,
        name: 'Dumbbells',
        used_weight: 50,
        number_of_equipments: 10,
      },
      {
        id: 3,
        name: 'Rowing Machine',
        used_weight: 100,
        number_of_equipments: 3,
      },
      {
        id: 4,
        name: 'Exercise Bike',
        used_weight: 90,
        number_of_equipments: 4,
      }
    ];


  // Grouped Equipment for displaying in the carousel
  groupedEquipments: any[] = [];
  currentSlide: number = 0;

  // Constructor to initialize the component and group the Equipments
  constructor() {
    this.groupEquipments();
}

  // Group Equipments into sets of 3 for carousel slides
  groupEquipments() {
    const groupSize = 3; 
    for (let i = 0; i < this.equipments.length; i += groupSize) {
      this.groupedEquipments.push(this.equipments.slice(i, i + groupSize));
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
    if (this.currentSlide < this.groupedEquipments.length - 1) {
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

