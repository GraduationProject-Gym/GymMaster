import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [SidebarComponent, CommonModule, RouterModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {

  constructor(private sidebarService: SidebarService, private router: Router) { }

  data: any;
  memberships: any[] = [];

  ngOnInit() {
    this.data = this.sidebarService.getSelectedData();
    console.log(this.data);
    if (!this.data) {
      this.router.navigate(['/trainee']);
      return;
    }

    this.data.forEach((membership: any) => {
      const type = membership.type;
      if (!this.memberships[type]) {
        this.memberships[type] = [];
      }
      this.memberships[type].push(membership);
    });
  }


  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
}
