import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
// import { Init } from 'v8';
import { Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../services/authentication/registration/registration.service';

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
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
<<<<<<< HEAD

  constructor(private registrationService: RegistrationService, private router: Router) {
=======
  constructor(private registrationService:RegistrationService, private router: Router){
>>>>>>> landing-registration
  }

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


  error(error: any) {
  }

  registrationForm = new FormGroup({
    // name: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    name: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{3,15}$')]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
<<<<<<< HEAD
    age: new FormControl(null, [Validators.required, Validators.min(10)]),
    goal: new FormControl(null, [Validators.required, Validators.minLength(8)]),
=======
    age: new FormControl(null, [Validators.required,Validators.min(10)]),
>>>>>>> landing-registration
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

  Registeration() {
    if (this.registrationForm.valid) {
<<<<<<< HEAD
      const formData = new FormData();
      Object.keys(this.registrationForm.value).forEach(key => {
        if (key === 'image') {
          const file = this.selectedFile;
          if (file) {
            // console.log(file);
            formData.append('image', file);
          }
        } else {
          formData.append(key, this.registrationForm.get([key])?.value);
        }
      });

      // Call Registration  service and handle response
      // console.log(formData);
      this.registrationService.register(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login'])
        },

        error: (error) => { console.log(error); }
      });
    } else {
      console.log('Form is invalid');
    }
=======
      const data = {
        userName: this.registrationForm.value.userName || '',
        email: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        // confirmPassword: this.registrationForm.value.confirmPassword || '',
        age: this.registrationForm.value.age || 10,
        phone: this.registrationForm.value.phone || '',
        address: this.registrationForm.value.address || '',
        gender: this.registrationForm.value.gender || '',
        image: this.registrationForm.value.image || '',
        role: this.registrationForm.value.role || ''
      };
        // Call Registration service and handle response
    this.registrationService.register(data).subscribe({
      next: (response) => {
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);      },
      error: (err) => {
        console.error(err);
      }
    });
  } else {
    console.warn('Form is invalid');
  }
>>>>>>> landing-registration

    if (this.registrationForm.valid) {
      this.showErrorAlert = false;
    } else {
      this.registrationForm.markAllAsTouched();
      this.showErrorAlert = true;
    }
  }
}
