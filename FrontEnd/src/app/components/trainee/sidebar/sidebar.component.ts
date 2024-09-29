import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // showDropdown(){
  //   document.querySelector('.dropdown-toggle').addEventListener('click', function() {
  //     const dropdown = this.nextElementSibling;
  //     dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  //   });
  // }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
