import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    // EditProfileComponent,

  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private sidebarService: SidebarService) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTraineeData();
  }

  loadTraineeData(): void {
    this.errorMessage = null; // Reset the error message 
    this.sidebarService.getProfileData().subscribe({
      next: (response) => {
        const trainee = response;

        // Populate the form with the fetched trainee data
        this.editProfileForm.patchValue({
          name: trainee.name,
          age: trainee.age,
          phone: trainee.phone,
          address: trainee.address,
          // Assuming image or other fields may be part of the response
          image: trainee.image || '' // Optional, if the image is available
        });

        console.log('Trainee data loaded successfully:', trainee);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      console.log('Profile updated:', this.editProfileForm.value);
      // Navigate to the profile page after successful form submission
      this.router.navigate(['/trainee-profile']);
    } else {
      console.log('Form is invalid');
    }
  }
}


// export class EditProfileComponent implements OnInit {

//   editProfileForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.editProfileForm = this.fb.group({
//       name: ['', Validators.required],
//       age: ['', [Validators.required, Validators.min(1)]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', Validators.required],
//       address: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.loadTraineeData();
//   }

//   loadTraineeData(): void {
//     const trainee = {
//       name: 'John Doe',
//       age: 30,
//       email: 'john.doe@example.com',
//       phone: '123456789',
//       address: '123 Main St'
//     };

//     this.editProfileForm.patchValue(trainee);
//   }

//   onSubmit(): void {
//     if (this.editProfileForm.valid) {
//       console.log('Profile updated:', this.editProfileForm.value);

//       this.router.navigate(['/profile']);
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }
