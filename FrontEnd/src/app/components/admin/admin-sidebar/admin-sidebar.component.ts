import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
//dropdown
  dropdownOpenTrainers = false;
  dropdownOpenReview = false;
  dropdownOpenClasses = false;

  toggleDropdownTrainers() {
    this.dropdownOpenTrainers = !this.dropdownOpenTrainers;
  }
  toggleDropdownClasses() {
    this.dropdownOpenClasses = !this.dropdownOpenClasses;
  }
  toggleDropdownReview() {
    this.dropdownOpenReview = !this.dropdownOpenReview;
  }
}
