import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

interface Class {
  className: string;
  // sessions: number;
  status: 'active' | 'inactive';
  groups: Array<{ days: string; hours: string }>;
  equipment: string;
  description: string;
}

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.css'
})

  export class AddClassComponent {
    classForm: FormGroup;
    groups: Array<{ days: string; hours: string }> = [{
      days: '',
      hours: ''
    }];

    constructor(private fb: FormBuilder) {
      this.classForm = this.fb.group({
        className: ['', Validators.required],
        trainerName: ['', Validators.required],

        sessions: [1, [Validators.required, Validators.min(1)]],
        status: ['active'],
        groups: this.fb.array(this.groups.map(group => this.fb.group({
          days: ['', Validators.required],
          hours: ['', Validators.required]
        }))),
        equipment: ['', Validators.required],
        description: ['', Validators.maxLength(500)]
      });
    }


    addGroup() {
      this.groups.push({ days: '', hours: '' });
      this.classForm.setControl('groups', this.fb.array(this.groups.map(group => this.fb.group({
        days: ['', Validators.required],
        hours: ['', Validators.required]
      }))));
    }

    save() {
      if (this.classForm.valid) {
        const newClass: Class = this.classForm.value;
        console.log('Class added:', newClass);
      } else {
        console.log('Form is invalid');
      }
    }

    cancel() {
      this.classForm.reset();
    }
  }

