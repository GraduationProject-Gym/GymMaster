import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResetPasswordService } from '../../services/authentication/reset-passsword/reset-password.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.resetPasswordForm = this.createFormGroup();
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   const { token, email } = params;
    //   if (!token || !email) {
    //     console.error('Missing token or email in the URL');
    //     return;
    //   }
    //   this.resetPasswordService.setTokenAndEmail(token, email);
    // });
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

  // Set up validation rules for password
  get passwordRequired() {
    return (this.resetPasswordForm.controls['password'].errors?.['required'] &&
      this.resetPasswordForm.controls['password'].touched) ||
      (this.resetPasswordForm.controls['confirmPassword'].errors?.['required'] &&
        this.resetPasswordForm.controls['confirmPassword'].touched);
  }

  get passwordFormatInvalid() {
    return (this.resetPasswordForm.controls['password'].errors?.['pattern'] &&
      this.resetPasswordForm.controls['password'].touched) ||
      (this.resetPasswordForm.controls['confirmPassword'].errors?.['pattern'] &&
        this.resetPasswordForm.controls['confirmPassword'].touched);
  }

  // Sanitize password input
  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || ''; 
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

  formSubmitted = false; // Track if the form has been submitted
  errorMessage: string | null = null;

  resetPassword() {
    this.formSubmitted = true; // Mark form as submitted
    this.errorMessage = null; // Reset the error message 

    const { token, email } = this.route.snapshot.queryParams;

    if (!token || !email) {
      console.error('Missing token or email in the URL');
      this.router.navigate(['/error']); // Redirect to an error page if necessary
      return;
    }

    this.resetPasswordService.setTokenAndEmail(token, email);

    if (this.resetPasswordForm.valid && this.passwordMatcher()) {
      let password = this.sanitizeInput(this.resetPasswordForm.value.password || '');
      let confirmPassword = this.sanitizeInput(this.resetPasswordForm.value.confirmPassword || '');

      this.resetPasswordService.resetPassword(password, confirmPassword).subscribe({
        next: response => {
          console.log('Password reset successful!', response);
          this.router.navigate(['/login']);
        },
        error: error => {
          // console.error('Error resetting password', error);
          if (error.status === 400) { // Check for the status code directly
            this.errorMessage = error.error?.message || '';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    } else {
      console.error('Passwords do not match or form is invalid');
    }
  }

  passwordMatcher() {
    let password = this.resetPasswordForm.controls['password'].value;
    let confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      return false;
    } else {
      return true; 
    }
  }
}
