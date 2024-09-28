import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MembershipService } from '../../../services/trainee/membership/membership.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [SidebarComponent],
  // providers: [MembershipService],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit{
  
  constructor(private membershipService:MembershipService){}
  ngOnInit(): void {
    this.membershipService.indexMemberships().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        if(error.status === 401){
          console.log("Unauth.");
        }
        console.log(error);
      }
    });
  }
}
