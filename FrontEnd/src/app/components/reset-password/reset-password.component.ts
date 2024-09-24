import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResetPasswordService } from '../../services/authentication/reset-passsword/reset-password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ResetPasswordService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit {
  email: string | null = null;
  token: string | null = null;
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get token and email from URL parameters
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const email = params['email'];
      if (!token || !email) {
        // Handle missing token or email
        console.log('Missing token or email in the URL');
      }
      this.resetPasswordService.setTokenAndEmail(token, email);
    });
  }
  
  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.resetPasswordService.resetPassword(this.newPassword).subscribe({
        next: (response) => {
          console.log('Password reset successful!', response);
          // Redirect to login or success page
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Error resetting password', error);
        }
      });
    } else {
      console.error('Passwords do not match');
    }
  }
}
