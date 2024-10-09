import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-add-membership',
  standalone: true,
  imports: [ReactiveFormsModule,
    AdminSidebarComponent,
    CommonModule
  ],
  templateUrl: './admin-add-membership.component.html',
  styleUrl: './admin-add-membership.component.css'
})
export class AdminAddMembershipComponent {
  membershipForm!: FormGroup;  
  periods: string[] = ['weekly', 'monthly', 'yearly']; 

  constructor(private fb: FormBuilder,  private router: Router) {}

  ngOnInit(): void {
    this.membershipForm = this.fb.group({
      type: ['', [Validators.required,Validators.minLength(3)]],
      price: ['', Validators.required],
      period: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.membershipForm.valid) {
      console.log(this.membershipForm.value);
      // this.membershipForm.reset(); 
      this.router.navigate(['/admin-membership']);

    }
  }
}
