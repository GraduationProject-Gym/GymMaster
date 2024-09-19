import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  // Create request to use login service
  constructor(private loginService: LoginService) { }

  // Create form elements and set up their basic validation rules
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/)])
  });

  // Set up validation rules
  get emailInValid() {
    return this.loginForm.controls['email'].invalid &&
      this.loginForm.controls['email'].touched &&
      this.loginForm.controls['email'].dirty;
  }

  get passwordInValid() {
    return this.loginForm.controls['password'].invalid &&
      this.loginForm.controls['password'].touched &&
      this.loginForm.controls['password'].dirty;
  }

  // Check user authentication and authorization
  loginAction() {
    if (this.loginForm.valid) {

      const data = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
        device_name: this.getDeviceName()
      };

      console.log(data); //test component output

      this.loginService.login(data).subscribe({
        next: (response) => { console.log(response); },
        error: (error) => { console.log(error); }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Get device name
  private getDeviceName(): string {
    return navigator.userAgent;
  }
}
