import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

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
  className: string = '';
  trainerName: string = '';
  sessions: number = 0;
  status: string = 'active';
  description: string = '';
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  equipmentList: string[] = ['Treadmill', 'Dumbbells', 'Yoga Mat', 'Resistance Bands'];
  selectedEquipment: { [key: string]: boolean } = {};
  exerciseList: string[] = ['Squats', 'Push-ups', 'Pull-ups', 'Plank'];
  selectedExercises: { [key: string]: boolean } = {};
  groups: { day: string, startHour: string, endHour: string , date:string}[] = [];

  constructor() {
    this.addSession();
  }

  addSession() {
    this.groups.push({
      day: '',
      startHour: '',
      endHour: '',
      date: '',
    });
  }

  // Validation for Start Hour before End Hour
  validateHours(startHour: string, endHour: string): boolean {
    if (!startHour || !endHour) {
      return true; 
    }
    return new Date(`1970-01-01T${startHour}`) < new Date(`1970-01-01T${endHour}`);
  }

  save(classForm: any) {
    if (classForm.valid) {
      // Execute the logic to save the class
      console.log('Class saved:', {
        className: this.className,
        trainerName: this.trainerName,
        sessions: this.sessions,
        status: this.status,
        description: this.description,
        groups: this.groups,
        selectedEquipment: this.selectedEquipment,
        selectedExercises: this.selectedExercises
      });
      // Reset the form or navigate to another page if needed
    } else {
      console.log('Form is invalid, please fill in all required fields.');
    }
  }

  cancel() {
    // Reset form fields or navigate away
    this.className = '';
    this.trainerName = '';
    this.sessions = 0;
    this.status = 'active';
    this.description = '';
    this.groups = [];
    this.selectedEquipment = {};
    this.selectedExercises = {};
  }
}
