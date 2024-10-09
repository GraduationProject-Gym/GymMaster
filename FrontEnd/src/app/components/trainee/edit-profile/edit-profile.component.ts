import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../../services/trainee/sidebar/sidebar.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sidebarService: SidebarService,
    private sanitizer: DomSanitizer
  ) {
    this.editProfileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      address: ['', [Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z0-9'.\-\s,]+$/)]],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadTraineeData();
  }

  loadTraineeData(): void {
    this.errorMessage = null; // Reset the error message 
    this.sidebarService.getProfileData().subscribe({
      next: (response) => {
        // console.log(response);
        const trainee = response;
        // Populate the form with the fetched trainee data
        this.editProfileForm.patchValue({
          id: trainee.id,
          name: trainee.name,
          age: trainee.age,
          phone: trainee.phone,
          address: trainee.address,
          // Assuming image or other fields may be part of the response
          image: trainee.selectedImage || '' // Optional, if the image is available
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

  onImageChange(event: any): void {
    const img = event.target.files[0];
    if (img) {
      this.selectedImage = img;
      this.editProfileForm.patchValue({ image: img.name });
    }
  }

  sanitizeInput(input: string): string {
    return this.sanitizer.sanitize(1, input) || '';
  }

  update() {
    const id = this.editProfileForm.get('id')?.value;
    this.errorMessage = null; // Reset the error message 
    this.editProfileForm.markAllAsTouched();

    if (this.editProfileForm.valid) {
      const formData = new FormData();
      Object.keys(this.editProfileForm.value).forEach(key => {
        if (key === 'image') {
          const img = this.selectedImage;
          if (img) {
            formData.append('image', img);
          }
        } else {
          const sanitizedValue = this.sanitizeInput(this.editProfileForm.get(key)?.value);
          formData.append(key, sanitizedValue);
        }
      });

      formData.append('_method', 'PUT');

      // Call update profile service and handle response
      this.sidebarService.updateProfileData(id, formData).subscribe({
        next: (response) => {
          console.log(response);
          window.location.href = this.router.serializeUrl(this.router.createUrlTree(['/trainee-profile']));
        },
        error: (error) => {
          console.log(error);
          if (error.status === 403) { // Validation error
            const validationErrors = error.error.message;
            console.log(validationErrors);
            // Iterate over the validation errors and set them on the form controls
            Object.keys(validationErrors).forEach(field => {
              const control = this.editProfileForm.get(field);
              if (control) {
                control.setErrors(null); // Clear any previous errors

                // Check if the error is an array and join them if necessary
                const errorMessageArray = validationErrors[field];
                control.setErrors({
                  backendError: Array.isArray(errorMessageArray) ? errorMessageArray.join(', ') : errorMessageArray
                });
              }
            });
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
    }
  }

}
