import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Init } from 'v8';



@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  providers:[RegisterService],
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit{

  userData: any []=[];
  constructor(private registerServ:RegisterService){
  }


  ngOnInit(): void {
    console.log( this.registerServ.registration( ))
    }








  myForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    // email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, Validators.minLength(30)]),
    goal: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
    address: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}')]),
    gender: new FormControl(null, Validators.required),
    image: new FormControl(null),
    membership_id: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

  get NameValid() {
    return this.myForm.controls['name'].valid;
  }
  get AgeValid() {
    return this.myForm.controls['age'].valid;
  }
  get EmailValid() {
    return this.myForm.controls['email'].valid;
  }
  get GoalValid() {
    return this.myForm.controls['goal'].valid;
  }
  get PhoneValid() {
    return this.myForm.controls['phone'].valid;
  }
  get AddressValid() {
    return this.myForm.controls['address'].valid;
  }
  get PasswordValid() {
    return this.myForm.controls['password'].valid;
  }
  get ConfirmPasswordValid() {
    return this.myForm.controls['confirmPassword'].valid ;
  }
  get GenderValid() {
    return this.myForm.controls['gender'].valid;
  }
  get MembershipValid() {
    return this.myForm.controls['membership_id'].valid;
  }

  get ImageValid() {
    return this.myForm.controls['image'].valid;
  }

  showSuccessAlert = false;
  showErrorAlert = false;


  passwordMatcher() {
    const password = this.myForm.controls['password'].value;
    const confirmPassword = this.myForm.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      this.myForm.controls['confirmPassword'].setErrors({ passwordMismatch: true });
    } else {
      this.myForm.controls['confirmPassword'].setErrors(null);
    }
  }

  // passwordMatcher() {
  //   const password = this.myForm.controls['password'].value;
  //   const confirmPassword = this.myForm.controls['confirmPassword'].value;

  //   if (password === confirmPassword) {
  //     this.myForm.controls['confirmPassword'].setErrors(null );
  //   } else {
  //     this.myForm.controls['confirmPassword'].setErrors({passwordMismatch: true});
  //   }
  // }


  Registeration() {

    this.passwordMatcher();

    if (this.myForm.valid) {
      this.showSuccessAlert = true;
      this.showErrorAlert = false;
    } else {
      this.myForm.markAllAsTouched();
      this.showSuccessAlert = false;
      this.showErrorAlert = true;
    }
    console.log('Name:', this.myForm.controls['name'].value);
    console.log('Age:', this.myForm.controls['age'].value);
    console.log('Membership ID:', this.myForm.controls['membership_id'].value);
    console.log('Gender:', this.myForm.controls['gender'].value);
    console.log('Password:', this.myForm.controls['password'].value);
    console.log('Confirm Password:', this.myForm.controls['confirmPassword'].value);
    console.log('Address:', this.myForm.controls['address'].value);
    console.log('Phone:', this.myForm.controls['phone'].value);

    console.log(this.myForm.controls['name'].valid)
    console.log(this.myForm.controls['age'].valid)
    console.log(this.myForm.controls['membership_id'].valid)
    console.log(this.myForm.controls['gender'].valid)
    console.log(this.myForm.controls['password'].valid)
    console.log(this.myForm.controls['confirmPassword'].valid)
    console.log(this.myForm.controls['address'].valid)
    console.log(this.myForm.controls['phone'].valid)

  }
}
