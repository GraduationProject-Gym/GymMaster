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
  dataFlag = false;

  ngOnInit() {
    this.membershipOptions = this.adminService.getSelectedData();
    this.dataFlag = true;
    if (!this.membershipOptions) {
      this.allMemberships();
      console.log(this.membershipOptions);
      return;
    }
  }

  //reload
  allMemberships(){
    this.errorMessage = null; // Reset the error message 
    this.adminService.indexMemberships().subscribe({
      next: (response) => {
        console.log(response.Memberships);
        this.adminService.setSelectedData(response.Memberships);
        this.membershipOptions = response.Memberships;
        // this.groupEquipments();
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
  // membershipOptions = [
  //   {
  //     id:1,
  //     type: 'VIP',
  //     prices: [
  //       { period: 'Yearly', price: 5000 ,periodID:1},
  //       { period: 'Monthly', price: 700 ,periodID:2},
  //       { period: 'Weekly', price: 200 ,periodID:3}
  //     ]
  //   },
  //   {
  //     type: 'Normal',
  //     id:2,
  //     prices: [
  //       { period: 'Yearly', price: 5000 ,periodID:1},
  //       { period: 'Monthly', price: 700 ,periodID:2},
  //       { period: 'Weekly', price: 200 ,periodID:3}
  //     ]
  //   }, {
  //     type: 'Normal',
  //     id: 3,
  //     prices: [
  //       { period: 'Yearly', price: 5000 ,periodID:1},
  //       { period: 'Monthly', price: 700 ,periodID:2},
  //       { period: 'Weekly', price: 200 ,periodID:3}
  //     ]
  //   }
  // ];
  
  // deleteMembershipPrice(optionId: number, periodID: number): void {
  //   if (window.confirm("Are you sure you want to delete this price option?")) {
  //     this.membershipOptions.forEach((option: { id: number; prices: any[]; }) => {
  //       if (option.id === optionId) {
  //         option.prices = option.prices.filter(price => price.periodID !== periodID);
  //       }
  //     });
  //   }
  // }

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
