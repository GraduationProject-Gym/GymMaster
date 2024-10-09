import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  membershipOptions = [
    {
      id:1,
      type: 'VIP',
      prices: [
        { period: 'Yearly', price: 5000 ,periodID:1},
        { period: 'Monthly', price: 700 ,periodID:2},
        { period: 'Weekly', price: 200 ,periodID:3}
      ]
    },
    {
      type: 'Normal',
      id:2,
      prices: [
        { period: 'Yearly', price: 5000 ,periodID:1},
        { period: 'Monthly', price: 700 ,periodID:2},
        { period: 'Weekly', price: 200 ,periodID:3}
      ]
    }, {
      type: 'Normal',
      id: 3,
      prices: [
        { period: 'Yearly', price: 5000 ,periodID:1},
        { period: 'Monthly', price: 700 ,periodID:2},
        { period: 'Weekly', price: 200 ,periodID:3}
      ]
    }
  ];
  
  deleteMembershipPrice(optionId: number, periodID: number): void {
    if (window.confirm("Are you sure you want to delete this price option?")) {
      this.membershipOptions.forEach(option => {
        if (option.id === optionId) {
          option.prices = option.prices.filter(price => price.periodID !== periodID);
        }
      });
    }
  }
}
