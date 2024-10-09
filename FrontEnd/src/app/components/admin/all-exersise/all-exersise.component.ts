import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminService } from '../../../services/admin/admin.service';

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
  
  exersises: any;
  errorMessage: string | null = null;
  dataFlag = false;
  // Array to hold the grouped exersises for the slider
  groupedExersises: any[] = [];

  currentSlide: number = 0;
  constructor(private adminService: AdminService, private router: Router) {
  }

  ngOnInit() {
    this.exersises = this.adminService.getSelectedData();
    this.dataFlag = true;
    if (!this.exersises) {
      this.allExercises();
      console.log(this.exersises);
      this.groupExercises();
      return;
    }
    this.groupExercises(); // Group equipments into sets for the carousel
  }

  //reload
  allExercises(){
    this.errorMessage = null; // Reset the error message 
    this.adminService.indexExercises().subscribe({
      next: (response) => {
        console.log(response);
        this.adminService.setSelectedData(response);
        this.exersises = response;
        this.groupExercises();
        this.router.navigate(['/admin-allExersise']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-allExersise']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
  // List of exersise data
  // exersises: any[] = [
  //   {
  //     name: 'Push Up',
  //     category: 'Strength',
  //     no_of_times: 15
  //   },
  //   {
  //     name: 'Jumping Jacks',
  //     category: 'Cardio',
  //     no_of_times: 30
  //   },
  //   {
  //     name: 'Push Up',
  //     category: 'Strength',
  //     no_of_times: 15
  //   },
  //   {
  //     name: 'Jumping Jacks',
  //     category: 'Cardio',
  //     no_of_times: 30
  //   },
  // ];

  // // Grouped Exersise for displaying in the carousel
  // groupedExersises: any[] = [];


  // // Constructor to initialize the component and group the Exersises
  // constructor() {
  //   this.groupExercises();
  // }

  // Group exercises into sets of 3 for carousel slides
  groupExercises() {
    const groupSize = 3;
    if (this.exersises && this.exersises.length) {
    for (let i = 0; i < this.exersises.length; i += groupSize) {
      this.groupedExersises.push(this.exersises.slice(i, i + groupSize));
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
