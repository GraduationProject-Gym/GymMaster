import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/authentication/login/login.service';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Create request to use login service
  constructor(
    private loginService: LoginService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  formSubmitted = false; // Track if the form has been submitted
  errorMessage: string | null = null;

  // Create form elements and set up their basic validation rules
  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) // Validate email format
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/) // Validate password complexity
    ])
  });

  // Set up validation rules for email
  get emailRequired() {
    return this.loginForm.controls['email'].errors?.['required'] &&
      this.loginForm.controls['email'].touched;
  }

  get emailFormatInvalid() {
    return this.loginForm.controls['email'].errors?.['pattern'] &&
      this.loginForm.controls['email'].touched;
  }

  // Set up validation rules for password
  get passwordRequired() {
    return this.loginForm.controls['password'].errors?.['required'] &&
      this.loginForm.controls['password'].touched;
  }

  get passwordFormatInvalid() {
    return this.loginForm.controls['password'].errors?.['pattern'] &&
      this.loginForm.controls['password'].touched;
  }

  // Sanitize input
  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || '';
  }

  // Check user authentication and authorization
  loginAction() {
    this.formSubmitted = true; // Mark form as submitted
    this.errorMessage = null; // Reset the error message

    if (this.loginForm.valid) {
      const data = {
        email: this.sanitizeInput(this.loginForm.value.email || ''),
        password: this.sanitizeInput(this.loginForm.value.password || ''),
        device_name: this.getDeviceName() // Get device name
      };

      // Call login service and handle response
      this.loginService.login(data).subscribe({
        next: (response) => {
          console.log(response);
          if (response.role === 'trainee'){
            this.router.navigate(['/trainee-profile']);
          } else if (response.role === 'trainer'){
            let traineesArray = response;
            this.loginService.setSelectedclass(traineesArray);
            this.router.navigate(['/trainer/classes']);
          }
        },
        error: (error) => {
          console.log(error);
          if (error.status === 403 && error.error?.email) {
            // Error in credentials
            this.errorMessage = error.error?.email;
          } else if (error.status === 403 && error.error?.message){
            // error in email verification
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
      console.log('Form is invalid'); // Log if form is invalid
    }
  }

  // Get device name
  private getDeviceName(): string {
    return navigator.userAgent;
  }

  // show & hide password
  showPassword() {
    const togglePassword = document.getElementById('togglePassword') as HTMLElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const eyeIcon = document.getElementById('eyeIcon') as HTMLElement;

    if (togglePassword && passwordInput) {
      const type: string = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);

      // Toggle the eye icon
      eyeIcon.classList.toggle('fa-eye-slash');
      eyeIcon.classList.toggle('fa-eye');
    }
  }
}
