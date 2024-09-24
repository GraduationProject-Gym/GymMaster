import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResetPasswordService } from '../../services/authentication/reset-passsword/reset-password.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ResetPasswordService],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {
    this.resetPasswordForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const { token, email } = params;
      if (!token || !email) {
        console.error('Missing token or email in the URL');
        return;
      }
      this.resetPasswordService.setTokenAndEmail(token, email);
    });
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/)
      ])
    });
  }

  get passwordRequired() {
    return this.isControlInvalid('password', 'required');
  }

  get passwordFormatInvalid() {
    return this.isControlInvalid('password', 'pattern');
  }

  private isControlInvalid(controlName: string, errorType: string): boolean {
    const control = this.resetPasswordForm.controls[controlName];
    return control.errors?.[errorType] && control.touched;
  }

  showPassword(inputType: string) {
    const passwordInput = document.getElementById(inputType) as HTMLInputElement;
    const eyeIcon = document.getElementById(inputType === 'password' ? 'eyeIcon' : 'confirmEyeIcon') as HTMLElement;

    if (passwordInput) {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      eyeIcon.classList.toggle('fa-eye-slash');
      eyeIcon.classList.toggle('fa-eye');
    }
  }

  resetPassword() {
    if (this.resetPasswordForm.valid && this.passwordsMatch()) {
      const { password, confirmPassword } = this.resetPasswordForm.value;
      this.resetPasswordService.resetPassword(password, confirmPassword).subscribe({
        next: response => {
          console.log('Password reset successful!', response);
          this.router.navigate(['/login']);
        },
        error: error => {
          console.error('Error resetting password', error);
        }
      });
    } else {
      console.error('Passwords do not match or form is invalid');
    }
  }

  private passwordsMatch(): boolean {
    const { password, confirmPassword } = this.resetPasswordForm.value;
    const match = password === confirmPassword;

    if (!match) {
      this.resetPasswordForm.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    } else {
      this.resetPasswordForm.controls['confirmPassword'].setErrors(null);
    }

    return match;
  }
}
