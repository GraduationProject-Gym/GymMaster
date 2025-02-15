import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../../services/authentication/forgot-password/forgot-password.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  // Create request to use forgot-password service
  constructor(private forgotPasswordService: ForgotPasswordService, private sanitizer: DomSanitizer) { }

  // Create form elements and set up their basic validation rules
  forgotPasswordForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Validate email format
    ])
  });

  get emailRequired() {
    return this.forgotPasswordForm.controls['email'].errors?.['required'] &&
      this.forgotPasswordForm.controls['email'].touched;
  }

  get emailFormatInvalid() {
    return this.forgotPasswordForm.controls['email'].errors?.['pattern'] &&
      this.forgotPasswordForm.controls['email'].touched;
  }

  // Sanitize email input
  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || ''; 
  }

  formSubmitted = false; // Track if the form has been submitted
  successMessage: string | null = null;
  errorMessage: string | null = null;


  // Send email to reset password 
  sendEmail() {
    this.formSubmitted = true; // Mark form as submitted
    this.errorMessage = null; // Reset the error message 

    if (this.forgotPasswordForm.valid) {
      const sanitizedEmail = this.sanitizeInput(this.forgotPasswordForm.value.email || '');
      const data = { email: sanitizedEmail };

      // Call forgot-password service and handle response
      this.forgotPasswordService.sendEmail(data).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'If that email is registered, we have sent you a password reset link!';
          this.errorMessage = null; // Reset error message
        },
        error: (error) => {
          // console.log(error);
          this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
          this.successMessage = null; // Reset success message
        }
      });
    } else {
      console.log('Form is invalid'); // Log if form is invalid
    }
  }
}
