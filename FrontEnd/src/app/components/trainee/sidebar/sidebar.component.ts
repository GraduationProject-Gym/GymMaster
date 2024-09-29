import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MembershipService } from '../../../services/trainee/membership/membership.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,
  ],
  providers:[MembershipService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private membershipService:MembershipService, private router:Router){}
  // showDropdown(){
  //   document.querySelector('.dropdown-toggle').addEventListener('click', function() {
  //     const dropdown = this.nextElementSibling;
  //     dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  //   });
  // }
  memberships: any[] = [];
  errorMessage: string | null = null;

  membership() {
    this.errorMessage = null; // Reset the error message 

    this.membershipService.indexMemberships().subscribe({
      next: (response: any) => {
        response.Memberships.forEach((membership: any) => {
          const type = membership.type;
          if (!this.memberships[type]) {
            this.memberships[type] = [];
          }
          this.memberships[type].push(membership);
        });
      },
      error: (error) => {
        if (error.status === 401) {
          // this.errorMessage = error.error?.message;
          this.router.navigate(['/login']);
          console.log(error);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }


  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
