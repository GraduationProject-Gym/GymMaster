import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-add-trainer',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AdminSidebarComponent
  ],
  templateUrl: './add-trainer.component.html',
  styleUrl: './add-trainer.component.css'
})
export class AddTrainerComponent {
  errorMessage: string | null = null;

  addTrainerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(18)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{11}$/)]),
    address: new FormControl(null, [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])[A-Za-z0-9'.\-\s,]+$/)]),
    gender: new FormControl(null, Validators.required),
    image: new FormControl(null),
    role: new FormControl("trainer"),
    cv: new FormControl(null)
  });

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
    }
  }
}

