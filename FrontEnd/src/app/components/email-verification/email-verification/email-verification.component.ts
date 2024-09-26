import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from '../../../services/authentication/email-verification/email-verification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {
  email: string | null = null; // Store the email
  errorMessage: string | null = null;
  successMessage: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private emailVerificationService: EmailVerificationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; // Retrieve email from query parameters
    });
  }

  sendVerificationEmail() {
    if (this.email) {
      this.emailVerificationService.sendVerificationEmail({ email: this.email }).subscribe({
        next: (response) => {
          this.successMessage = 'Verification email sent successfully!';
        },
        error: (error) => {
          this.errorMessage = 'Error sending verification email.';
        }
      });
    }
  }
}
