import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-membership',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-membership.component.html',
  styleUrl: './admin-membership.component.css'
})
export class AdminMembershipComponent {
  constructor(private adminService: AdminService, private router: Router) {
  }
  membershipOptions: any;
  errorMessage: string | null = null;
  memberships: any[] = [];
  dataFlag = false;

  ngOnInit() {
    this.membershipOptions = this.adminService.getSelectedData();
    this.dataFlag = true;
    if (!this.membershipOptions) {
      this.allMemberships();
      console.log(this.membershipOptions);
      return;
    }
    this.toArray(this.membershipOptions);

  }

  //reload
  allMemberships(){
    this.errorMessage = null; // Reset the error message 
    this.adminService.indexMemberships().subscribe({
      next: (response) => {
        this.membershipOptions = response.Memberships;
        this.toArray(this.membershipOptions);
        // this.membershipOptions = response.Memberships;
        // this.toArray(this.membershipOptions);
        this.router.navigate(['/admin-membership']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/admin-membership']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
  toArray(data: any) {
    // Group memberships by membership type to show them in a user friendly way
    this.membershipOptions.forEach((membership: any) => {
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

  deleteMembershipPrice(optionId: number): void {
    if (window.confirm("Are you sure you want to delete this price option?")) {
      this.membershipOptions.forEach((option: { id: number; amount: any[]; }) => {
        if (option.id === optionId) {
          option.amount = option.amount;
        }
      });
    }
  }
}
