import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Init } from 'v8';
import { RouterModule } from '@angular/router';
import { RegistrationService } from '../../services/authentication/registration/registration.service';
// import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // LoginComponent,
    RouterModule

  ],
  providers:[RegistrationService],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private registrationService:RegistrationService){
  }




  error(error: any) {
  }


    registrationForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    // email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required,Validators.min(10)]),
    goal: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
    address: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    password_confirmation: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    gender: new FormControl(null, Validators.required),
    image: new FormControl(null),
    role: new FormControl("trainee"),
    });

  get NameValid() {
    return this.registrationForm.controls['name'].valid;
  }
  get AgeValid() {
    return this.registrationForm.controls['age'].valid;
  }
  get EmailValid() {
    return this.registrationForm.controls['email'].valid;
  }
  get GoalValid() {
    return this.registrationForm.controls['goal'].valid;
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
  get ConfirmPasswordValid() {
    return this.registrationForm.controls['password_confirmation'].valid ;
  }
  get GenderValid() {
    return this.registrationForm.controls['gender'].valid;
  }

  get ImageValid() {
    return this.registrationForm.controls['image'].valid;
  }

  showSuccessAlert = false;
  showErrorAlert = false;


  // passwordMatcher() {
  //   const password = this.registrationForm.controls['password'].value;
  //   const confirmPassword = this.registrationForm.controls['confirmPassword'].value;

  //   if (password !== confirmPassword) {
  //     this.registrationForm.controls['confirmPassword'].setErrors({ passwordMismatch: true });
  //   } else {
  //     this.registrationForm.controls['confirmPassword'].setErrors(null);
  //   }
  // }

  // passwordMatcher() {
  //   const password = this.registrationForm.controls['password'].value;
  //   const confirmPassword = this.registrationForm.controls['confirmPassword'].value;

  //   if (password === confirmPassword) {
  //     this.registrationForm.controls['confirmPassword'].setErrors(null );
  //   } else {
  //     this.registrationForm.controls['confirmPassword'].setErrors({passwordMismatch: true});
  //   }
  // }


  Registeration() {
    if (this.registrationForm.valid) {
      const data = {
        name: this.registrationForm.value.name || '',
        email: this.registrationForm.value.email || '',
        password: this.registrationForm.value.password || '',
        // password_confirmation: this.registrationForm.value.password_confirmation || '',
        age: this.registrationForm.value.age || 10,
        goal: this.registrationForm.value.goal || '',
        phone: this.registrationForm.value.phone || '',
        address: this.registrationForm.value.address || '',
        gender: this.registrationForm.value.gender || '',
        image: this.registrationForm.value.image || '',
        role: this.registrationForm.value.role || ''
      };
       // Call Registration  service and handle response
      this.registrationService.register(data).subscribe({
      next: (response) => { console.log(response); },
      error: (error) => { console.log(error); }
      });
      } else {
    console.log('Form is invalid');
    }

    // this.passwordMatcher();

    if (this.registrationForm.valid) {
      this.showSuccessAlert = true;
      this.showErrorAlert = false;
    } else {
      this.registrationForm.markAllAsTouched();
      this.showSuccessAlert = false;
      this.showErrorAlert = true;
    }
  }



}
