import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule, Time } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';

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


export class AdminAddClassComponent implements OnInit{
  className: string = '';
  trainerID: number = 0;
  trainers:any;
  maxTrainee:number=0;
  sessions: number = 0;
  status: string = 'active';
  description: string = '';
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  equipmentList: any;
  selectedEquipment: number[]=[];
  exerciseList: any;
  selectedExercises: number[]=[];
  groups: { day: any, startHour: any, endHour: any , date:any}[] = [];
  errorMessage:string ='';
  data:any;
  add_Session:boolean =false;
  status_:boolean =false;

  trainerName: any;
  selectedTrainerId:any;


  constructor(private adminService: AdminService,private router: Router) {
    this.addSession();
  }
  ngOnInit(): void {
    this.data= this.adminService.getTools();
    console.log(this.data);
    if(!this.data){
      this.addClassReload();
      return;
    }
    console.log(this.data);
    this.equipmentList=this.data.equpments;
    this.exerciseList=this.data.exercises;
    this.trainers = this.data.trainers.filter((trainer:any) => trainer.name !==null);
        console.log(this.trainers);

  }
  addSession() {
    if(this.groups.length>1){
      this.add_Session=true;
    }else{
      this.groups.push({
        day: "",
        startHour: "",
        endHour: "",
        date: "",
    });
    }
  }

  onTrainerChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.trainerID = +selectedValue; // Convert the value to a number
    // console.log(this.trainerID);
  }

  addClassReload(){
    this.adminService.addClass().subscribe({
      next: (response) => {
        this.data = response;
        this.equipmentList=this.data.equpments;
        this.exerciseList=this.data.exercises;
        this.trainers = this.data.trainers.filter((trainer:any) => trainer.name !==null);
        this.router.navigate(['/admin-addClass']);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
          this.errorMessage = error.error?.message;
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  // Validation for Start Hour before End Hour
  validateHours(startHour: string, endHour: string): boolean {
    if (!startHour || !endHour) {
      return true;
    }
    return new Date(`1970-01-01T${startHour}`) < new Date(`1970-01-01T${endHour}`);
  }
  onEquipmentChange(event: Event, id: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedEquipment.push(id);
    } else {
      this.selectedEquipment = this.selectedEquipment.filter((equipId: any) => equipId !== id);
    }
  }

  onExerciseChange(event: Event, id: number): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedExercises.push(id);
    } else {
      this.selectedExercises = this.selectedExercises.filter(exId => exId !== id);
    }
    // console.log(this.selectedExercises);
  }

  save(classForm: any) {
    if (classForm.valid) {
      // Execute the logic to save the class
      if(this.status === 'active') this.status_=true;
      this.groups.forEach(group => {
        if (group.startHour) {
          group.startHour = new Date(`1970-01-01T${group.startHour}`).toLocaleTimeString('en-GB', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          });
        } else {
          group.startHour = 'Invalid Time';
        }

        if (group.endHour) {
          group.endHour = new Date(`1970-01-01T${group.endHour}`).toLocaleTimeString('en-GB', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          });
        } else {
          group.endHour = 'Invalid Time';
        }

        // Ensure date is valid before formatting
        if (group.date) {
          let x="";let dd="";
          for(let i=0;i <group.date.length;i++){
            if(!isNaN(group.date[i]) && group.date[i] !== " "){
              x+=group.date[i];
            }
            else{
              dd+=x;
              dd+="-";
              x="";
            }
          }
          dd+=x;
          // let y = group.date.split('/');
          // group.date = `${y[0]}-${y[1]}-${y[2]}`; // Convert to YYYY-MM-DD
        } else {
          group.date = '10-11-2025';
        }

      });
      const data_class =  {
        name: this.className,
        trainer_id: this.trainerID,
        total_no_of_session: this.sessions,
        status: this.status_,
        description: this.description,
        max_trainee:this.maxTrainee,
        groups: this.groups,
        selectedEquipment: this.selectedEquipment,
        selectedExercises: this.selectedExercises,
      };

      this.adminService.createClass(data_class).subscribe({
        next: (response) => {
          console.log(response);
          this.data = this.adminService.getSelectedData();
          this.router.navigate(['/admin-addClass']);
        },
        error: (error) => {
          console.log(error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
            this.errorMessage = error.error?.message;
          } else if (error.status === 403) {
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
      // this.addClassReload();
      // Reset the form or navigate to another page if needed
    } else {
      console.log('Form is invalid, please fill in all required fields.');
    }
  }

  cancel() {
    // Reset form fields or navigate away
    this.className = '';
    this.trainerID = 0;
    this.sessions = 0;
    this.status = 'active';
    this.description = '';
    this.groups = [];
    this.selectedEquipment = [];
    this.selectedExercises = [];
    this.selectedTrainerId = 0;
  }
}
