import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../services/authentication/registration/registration.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private sanitizer: DomSanitizer) { }

  // Extract image name from its path
  imageName: string | null = null;

  onFileChange(event: any): void {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registrationForm.patchValue({ image: file.name });
    }
    // }
  }


  // error(error: any) {
  // }

  registrationForm = new FormGroup({
    // name: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    name: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,15}$')]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(10)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
    address: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    gender: new FormControl(null, Validators.required),
    image: new FormControl(null),
    role: new FormControl("trainee"),
  });


  selectedFile: File | null = null;

  get userNameValid() {
    return this.registrationForm.controls['name'].valid;
  }
  get AgeValid() {
    return this.registrationForm.controls['age'].valid;
  }
  get EmailValid() {
    return this.registrationForm.controls['email'].valid;
  }

  get PhoneValid() {
    return this.registrationForm.controls['phone'].valid;
  }
  get AddressValid() {
    return this.registrationForm.controls['address'].valid;
  }
  get PasswordValid() {
    return this.registrationForm.controls['password'].valid;
  }
  get GenderValid() {
    return this.registrationForm.controls['gender'].valid;
  }

  get ImageValid() {
    return this.registrationForm.controls['image'].valid;
  }

  showSuccessAlert = false;
  showErrorAlert = false;

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

  errorMessage: string | null = null;

  Registeration() {
    this.errorMessage = null; // Reset the error message 
    if (this.registrationForm.valid) {
      const formData = new FormData();
      Object.keys(this.registrationForm.value).forEach(key => {
        if (key === 'image') {
          const file = this.selectedFile;
          if (file) {
            // console.log(file);
            formData.append('image', file);
          }
        } else {
          // const sanitizedValue = this.sanitizeInput(this.registrationForm.get(key)?.value);
          // console.log(sanitizedValue);
          // formData.append(key, sanitizedValue);
          formData.append(key, this.registrationForm.get(key)?.value);
        }
      });

      // Call Registration  service and handle response
      // console.log(formData);
      this.registrationService.register(formData).subscribe({
        next: (response) => {
          console.log(response);
          const registeredEmail = this.registrationForm.get('email')?.value;
          this.router.navigate(['/email-verification'], { queryParams: { email: registeredEmail } });
        },

        error: (error) => {
          if (error.status === 403) { // Check for the status code directly
            this.errorMessage = error.error?.message.age || "Access Denied";
            console.log(error.error?.message);
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    } else {
      console.log('Form is invalid');
    }

    if (this.registrationForm.valid) {
      this.showErrorAlert = false;
    } else {
      this.registrationForm.markAllAsTouched();
      this.showErrorAlert = true;
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

