import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MembershipService } from '../../../services/trainee/membership/membership.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterModule],
  // providers: [MembershipService],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent{// implements OnInit {

  constructor(private membershipService: MembershipService, private router: Router) { }

  // memberships: any[] = [];
  // errorMessage: string | null = null;

  // ngOnInit(): void {
  //   this.errorMessage = null; // Reset the error message 

  //   this.membershipService.indexMemberships().subscribe({
  //     next: (response: any) => {
  //       response.Memberships.forEach((membership: any) => {
  //         const type = membership.type;
  //         if (!this.memberships[type]) {
  //           this.memberships[type] = [];
  //         }
  //         this.memberships[type].push(membership);
  //       });
  //     },
  //     error: (error) => {
  //       if (error.status === 401) {
  //         // this.errorMessage = error.error?.message;
  //         this.router.navigate(['/login']);
  //         console.log(error);
  //       } else {
  //         this.errorMessage = 'An unexpected error occurred. Please try again later.';
  //       }
  //     }
  //   });
  // }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
