import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../services/authentication/registration/registration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers: [RegistrationService],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css',
  ]
})
export class RegistrationComponent {

  errorMessage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  registrationForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,15}$')]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(10)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
    address: new FormControl(null, [Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z0-9'.\-\s,]+$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    gender: new FormControl(null, Validators.required),
    image: new FormControl(null),
    role: new FormControl("trainee"),
  });

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registrationForm.patchValue({ image: file.name });
    }
  }

  passwordMatcher() {
    const password = this.registrationForm.controls['password'].value;
    const confirmPassword = this.registrationForm.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      this.registrationForm.controls['confirmPassword'].setErrors({ passwordMismatch: true });
      return false; // Return false if passwords do not match
    } else {
      this.registrationForm.controls['confirmPassword'].setErrors(null);
      return true; // Return true if passwords match
    }
  }
  get ConfirmPasswordRequired() {
    return this.registrationForm.controls['confirmPassword'].errors?.['required'] &&
      this.registrationForm.controls['confirmPassword'].touched;
  }

  get ConfirmPasswordValid() {
    return !this.registrationForm.controls['confirmPassword'].errors;
    // Return false if passwords do not match
    // Return true if passwords match
  }

  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || '';
  }

  Registeration() {
    this.errorMessage = null; // Reset the error message 
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      const formData = new FormData();
      Object.keys(this.registrationForm.value).forEach(key => {
        if (key === 'image') {
          const file = this.selectedFile;
          if (file) {
            formData.append('image', file);
          }
        } else {
          const sanitizedValue = this.sanitizeInput(this.registrationForm.get(key)?.value);
          formData.append(key, sanitizedValue);
        }
      });

      // Call Registration  service and handle response
      this.registrationService.register(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error);
          if (error.status === 403) { // Validation error
            const validationErrors = error.error;
            console.log(validationErrors);
            Object.keys(validationErrors).forEach(field => {
              const control = this.registrationForm.get(field);
              if (control) {
                control.setErrors(null); // Clear previous errors
                // Create a new error object with all the error messages for the control
                const errorMessageArray = validationErrors[field];
                control.setErrors({
                  backendError: errorMessageArray.join(', ')
                });
              }
            });
          // } else if (error.status === 403) {
          //   this.errorMessage = 'Access Denied: You are not authorized to perform this action.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
    }
  }

  /* show & hide password*/
  showPassword(inputType: string) {
    const passwordInput = document.getElementById(inputType) as HTMLInputElement;
    const eyeIcon = document.getElementById(inputType === 'password' ? 'eyeIcon' : 'confirmEyeIcon') as HTMLElement;

    if (passwordInput) {
      const type: string = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';

      // ternary operator
      passwordInput.setAttribute('type', type);

      // Toggle the eye icon
      eyeIcon.classList.toggle('fa-eye-slash');
      eyeIcon.classList.toggle('fa-eye');
    }
  }
}