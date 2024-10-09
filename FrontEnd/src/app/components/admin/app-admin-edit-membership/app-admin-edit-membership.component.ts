import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-app-admin-edit-membership',
  standalone: true,
  imports: [FormsModule,CommonModule,AdminSidebarComponent],
  templateUrl: './app-admin-edit-membership.component.html',
  styleUrl: './app-admin-edit-membership.component.css'
})
export class AppAdminEditMembershipComponent implements OnInit{


    membershipOption: any;
  
    constructor(private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!; 
      const allOptions = [
        {
          id: 1,
          type: 'VIP',
          prices: [
            { period: 'Yearly', price: 5000, periodID: 1 },
            { period: 'Monthly', price: 700, periodID: 2 },
            { period: 'Weekly', price: 200, periodID: 3 }
          ]
        },
        {
          id: 2,
          type: 'Normal',
          prices: [
            { period: 'Yearly', price: 5000, periodID: 1 },
            { period: 'Monthly', price: 700, periodID: 2 },
            { period: 'Weekly', price: 200, periodID: 3 }
          ]
        },
        {
          id: 3,
          type: 'Normal',
          prices: [
            { period: 'Yearly', price: 5000, periodID: 1 },
            { period: 'Monthly', price: 700, periodID: 2 },
            { period: 'Weekly', price: 200, periodID: 3 }
          ]
        }
      ];

      this.membershipOption = allOptions.find(option => option.id === id);
    }
  
    save(): void {
      alert('Membership option updated successfully!');
      this.router.navigate(['/admin/membership']);
    }
}
