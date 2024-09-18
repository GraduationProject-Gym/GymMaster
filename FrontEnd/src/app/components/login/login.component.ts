import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private data = { email: "", password: "" };
  constructor(private loginService: LoginService) { }
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern('/^[^\s@]+@[^\s@]+\.[^\s@]+$/')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%*?&]).{8,}')])
  });

  get emailValid() {
    return this.loginForm.controls['email'].valid;
  }

  get passwordValid() {
    return this.loginForm.controls['password'].valid;
  }

  ngOnInit(): void {
    // this.loginService.login(this.data).subscribe({
    //   next: (data) => { console.log(data); },
    //   error: (error) => { console.log(error); }
    // });
  }

  loginAction() {
    console.log(this.loginForm.value);
    this.loginService.login(this.data).subscribe({
      next: (data) => { console.log(data); },
      error: (error) => { console.log(error); }
    });
  }
}
