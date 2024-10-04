import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';


interface Class {
  className: string;
  // sessions: number;
  status: 'active' | 'inactive';
  groups: Array<{ days: string; hours: string }>;
  equipment: string;
  description: string;
}

@Component({
  selector: 'app-admin-add-class',
  standalone: true,
  imports: [AdminSidebarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-add-class.component.html',
  styleUrl: './admin-add-class.component.css'
})


export class AdminAddClassComponent {

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  // hours = [
  //   '08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
  //   '12:00 PM - 01:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM',
  //   '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM',
  //   '08:00 PM - 09:00 PM', '09:00 PM - 10:00 PM', '10:00 PM - 11:00 PM', '11:00 PM - 12:00 AM'
  // ];


  classForm: FormGroup;
  groups: Array<{ days: string; hours: string }> = [{
    days: '',
    hours: ''
  }];

  constructor(private fb: FormBuilder) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      trainerName: ['', Validators.required],
      sessions: [1, [Validators.required, Validators.min(4)]],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      status: ['active'],
      groups: this.fb.array(this.groups.map(group => this.fb.group({
        days: ['', Validators.required],
        hours: ['', Validators.required]
      }))),
      equipment: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
      exercise: ['', Validators.maxLength(500)]

    });
  }



  get groupsFormArray(): FormArray {
    return this.classForm.get('groups') as FormArray;
  }



  addGroup() {
    this.groups.push({ days: '', hours: '' });
    this.classForm.setControl('groups', this.fb.array(this.groups.map(group => this.fb.group({
      days: ['', Validators.required],
      hours: ['', Validators.required]
    }))));
  }

  save() {
    const startHour = this.classForm.get('startHour')?.value;
    const endHour = this.classForm.get('endHour')?.value;

    if (startHour && endHour && startHour >= endHour) {
      alert('End time must be after start time');
      return;
    }

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

