// import { Component } from '@angular/core';
// import { EmailVerificationService } from '../../../services/authentication/email-verification/email-verification.service';
// import { CommonModule } from '@angular/common';
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-email-verification',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule
//   ],
//   templateUrl: './email-verification.component.html',
//   styleUrl: './email-verification.component.css'
// })
// export class EmailVerificationComponent {
//   // Create form elements and set up their basic validation rules
//   emailVerificationForm = new FormGroup({
//     email: new FormControl(null, [
//       Validators.required,
//       Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Validate email format
//     ])
//   });

//   get emailRequired() {
//     return this.emailVerificationForm.controls['email'].errors?.['required'] &&
//       this.emailVerificationForm.controls['email'].touched;
//   }

//   get emailFormatInvalid() {
//     return this.emailVerificationForm.controls['email'].errors?.['pattern'] &&
//       this.emailVerificationForm.controls['email'].touched;
//   }

//   formSubmitted = false; // Track if the form has been submitted
//   successMessage: string | null = null;
//   errorMessage: string | null = null;

//   // Create request to use email verification service
//   constructor(private emailVerificationService: EmailVerificationService) { }

//   // Send email to verify
//   sendEmail() {
//     this.formSubmitted = true; // Mark form as submitted
//     this.errorMessage = null; // Reset the error message 

//     if (this.emailVerificationForm.valid) {
//       const data = {
//         email: this.emailVerificationForm.value.email || ''
//       };

//       // Call email-verification service and handle response
//       this.emailVerificationService.sendVerificationEmail(data).subscribe({
//         next: (response) => {
//           console.log(response);
//           this.successMessage = 'If that email is registered, we have sent you a password reset link!';
//           this.errorMessage = null; // Reset error message
//         },
//         error: (error) => {
//           // console.log(error);
//           this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
//           this.successMessage = null; // Reset success message
//         }
//       });
//     } else {
//       console.log('Form is invalid'); // Log if form is invalid
//     }
//   }
// }


// import { Component, Input } from '@angular/core';
// import { EmailVerificationService } from '../../../services/authentication/email-verification/email-verification.service';

// @Component({
//   selector: 'app-email-verification',
//   templateUrl: './email-verification.component.html',
// })
// export class EmailVerificationComponent {
//   @Input() email: string | null = null; // Accept the email from parent component
//   message: string | null = null;

//   constructor(private emailVerificationService: EmailVerificationService) {}

//   sendVerificationEmail() {
//     if (this.email) {
//       this.emailVerificationService.sendVerificationEmail(this.email).subscribe({
//         next: () => {
//           this.message = 'Verification email sent successfully!';
//         },
//         error: () => {
//           this.message = 'Error sending verification email.';
//         }
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailVerificationService } from '../../../services/authentication/email-verification/email-verification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent implements OnInit {
  email: string | null = null; // Store the email
  message: string | null = null;

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
        next: () => {
          this.message = 'Verification email sent successfully!';
        },
        error: () => {
          this.message = 'Error sending verification email.';
        }
      });
    }
  }
}
