import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';  // Add this import
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';  // Import the AdminSidebarComponent
import { AdminService } from '../../../services/admin/admin.service';

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

  equipments: any;
  errorMessage: string | null = null;
  dataFlag = false;
  // Array to hold the grouped equipments for the slider
  groupedEquipments: any[] = [];

  currentSlide: number = 0;
  constructor(private adminService: AdminService, private router: Router) {
  }
  
  ngOnInit() {
    this.equipments = this.adminService.getSelectedData();
    this.dataFlag = true;
    if (!this.equipments) {
      this.allEquipments();
      console.log(this.equipments);
      this.groupEquipments();
      return;
    }
    this.groupEquipments(); // Group equipments into sets for the carousel
  }
  //reload
  allEquipments(){
    this.errorMessage = null; // Reset the error message 
    this.adminService.indexEquipments().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.equipments = response;
        this.groupEquipments();
        this.router.navigate(['/admin-allEquipments']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-allEquipments']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Group Equipments into sets of 3 for carousel slides
  groupEquipments() {
    const groupSize = 3; 
    if (this.equipments && this.equipments.length) {
    for (let i = 0; i < this.equipments.length; i += groupSize) {
      this.groupedEquipments.push(this.equipments.slice(i, i + groupSize));
    }
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

