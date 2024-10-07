import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-all-trainees',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, RouterModule],
  templateUrl: './all-trainees.component.html',
  styleUrl: './all-trainees.component.css'
})
export class AllTraineesComponent {

  // Access to the carousel element in the template
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  // Constructor to initialize the component and group the trainers
  constructor(private adminService: AdminService, private router: Router) {
  }

  // List of trainees data

  trainees: any;
  errorMessage: string | null = null;
  dataFlag = false;
  groupedTrainees: any[] = [];
  currentSlide: number = 0;
  ngOnInit() {
    this.trainees = this.adminService.getSelectedData();
    this.dataFlag = true;
    if (!this.trainees) {
      this.indexTraineesData();
      console.log(this.trainees);
      this.groupTrainees();
      return;
    }
    this.groupTrainees(); // Group trainers into sets for the carousel
    this.setProfileImage(); // Set default profile images based on gender

  }
  // reload
  indexTraineesData() {
    this.errorMessage = null; // Reset the error message 
    this.adminService.indexTrainees().subscribe({
      next: (response) => {
        console.log(response);
        this.trainees = response;
        this.adminService.setSelectedData(response);
        this.groupTrainees(); // Group trainers into sets for the carousel
        this.setProfileImage(); // Set default profile images based on gender
        this.router.navigate(['/admin-trainees']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-trainees']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Group trainers into sets of 3 for carousel slides
  groupTrainees() {
    const groupSize = 2; // Number of trainers per slide
    if (this.trainees && this.trainees.length) {
      for (let i = 0; i < this.trainees.length; i += groupSize) {
        this.groupedTrainees.push(this.trainees.slice(i, i + groupSize));
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
    if (this.currentSlide < this.groupedTrainees.length - 1) {
      this.currentSlide++;
      this.updateCarousel(); // Update the carousel to reflect the change
    }
  }

  // Update the active carousel item based on the current slide index
  updateCarousel() {
    if (!this.carousel || !this.carousel.nativeElement) {
      return; // Exit if the carousel is not yet initialized
    }
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
    this.trainees.forEach((trainee: { srcImg: string; gender: string; }) => {
      if (!trainee.srcImg) {
        // If no image is provided, use default based on gender
        trainee.srcImg = trainee.gender === 'female' ? "/female.png" : "/male.png";
      }
    });
  }
}

