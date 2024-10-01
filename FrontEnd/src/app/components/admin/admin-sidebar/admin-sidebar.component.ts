import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
//dropdown
  dropdownOpenTrainers = false;
  dropdownOpenReview = false;

  toggleDropdownTrainers() {
    this.dropdownOpenTrainers = !this.dropdownOpenTrainers;
  }
  toggleDropdownReview() {
    this.dropdownOpenReview = !this.dropdownOpenReview;
  }
}
