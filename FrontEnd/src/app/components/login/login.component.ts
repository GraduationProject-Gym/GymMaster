import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formSubmitted = false; // Track if the form has been submitted

  // Create request to use login service
  constructor(private loginService: LoginService) { }

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

  // Check user authentication and authorization
  loginAction() {
    this.formSubmitted = true; // Mark form as submitted

    // if (this.loginForm.valid) {
    const data = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
      device_name: this.getDeviceName() // Get device name
    };

    // const data = {
    //   email: 'yousef6@gmail.com',
    //   password: '123456789',
    //   device_name: 'device' // Get device name
    // };

    console.log(data); // Test component output

    // Call login service and handle response
    this.loginService.login(data).subscribe({
      next: (response) => { console.log(response); },
      error: (error) => { console.log(error); }
    });
    // } else {
    //   console.log('Form is invalid'); // Log if form is invalid
    // }
  }

  // Get device name
  private getDeviceName(): string {
    return navigator.userAgent;
  }
}
