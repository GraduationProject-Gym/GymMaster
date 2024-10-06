import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { MembershipService } from '../../../services/trainee/membership/membership.service';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { environment } from '../../../../environments/environment';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
    private membershipService: MembershipService,
    private router: Router,

  ) { }

  data: any;
  memberships: any[] = [];
  errorMessage: string | null = null;

  // Index memberships
  ngOnInit() {
    this.data = this.sidebarService.getSelectedData();
    console.log(this.data);
    if (!this.data) {
      this.membership();
      return;
    }
    this.toArray(this.data);
  }

  // Handle reload case
  membership() {
    this.errorMessage = null; // Reset the error message
    this.sidebarService.indexMemberships().subscribe({
      next: (response) => {
        this.data = response.Memberships;
        this.toArray(this.data);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  toArray(data: any) {
    // Group memberships by membership type to show them in a user friendly way
    this.data.forEach((membership: any) => {
      const type = membership.type;
      if (!this.memberships[type]) {
        this.memberships[type] = [];
      }
      this.memberships[type].push(membership);
    });
  }

  // Uniform subsctiption type to begin with capital letters
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  // Subscribe a membership
  subscribe(membershipId: number) {
    this.errorMessage = null; // Reset the error message
    console.log(membershipId);
    this.membershipService.subscribeMemberShip(membershipId).subscribe({
      next:(response) => {
        this.membershipService.setSelectedData(response);
        console.log(response);
        window.location.href = response.url;
      },
      error:(error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          // this.errorMessage = error.error?.message;
          // console.log(error);
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
          console.log(error);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
