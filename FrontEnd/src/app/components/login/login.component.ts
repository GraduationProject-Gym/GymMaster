import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, FormsModule, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // FormsModule,
    // CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern('/^[^\s@]+@[^\s@]+\.[^\s@]+$/')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%*?&]).{8,}')]),
  });

  get emailValid() {
    return this.loginForm.controls['email'].valid;
  }

  loginAction() {
    console.log(this.loginForm.value);
    // if (this.loginForm.valid) {
    //   //redirect to home page
    // } else {
    //   alert("Login data is not valid")
    // }
  }
}
