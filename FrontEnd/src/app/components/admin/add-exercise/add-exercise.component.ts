import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-add-exercise',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, FormsModule],
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AdminAddExerciseComponent {
  serverErrors: string[] = [];

  // save(exerciseForm: NgForm) {
  //   if (exerciseForm.valid) {
  //     const exerciseData = {
  //       name: this.name,
  //       category: this.category,
  //       no_of_times: this.no_of_times
  //     };

  //     this.http.post('/api/exercises', exerciseData).subscribe({
  //       next: (response) => {
  //         console.log('Exercise saved:', response);
  //         this.router.navigate(['/admin/exercises']);
  //       },
  //       error: (error) => {
  //         if (error.status === 422) {
  //           this.serverErrors = error.error.errors;
  //         } else {
  //           console.error('An error occurred:', error);
  //         }
  //       }
  //     });
  //   } else {
  //     console.log('Form is invalid, please fill in all required fields.');
  //   }
  // }
  name: string = '';
  category: string = '';
  no_of_times: number | null = null;
  data: any;

  // constructor(private http: HttpClient, private router: Router) {}
  constructor(private adminService: AdminService,private router: Router) {
  }

  save(exerciseForm: NgForm) {
    if (exerciseForm.valid) {
      
      const data_exercise =  {
        name: this.name,
        category: this.category,
        no_of_times:this.no_of_times
      };

      this.adminService.addExercise(data_exercise).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data = this.adminService.getSelectedData();
          console.log('Exercise saved:', response);
          this.router.navigate(['admin-allExersise']);
        },
        error: (error) => {
          if (error.status === 422) {
            console.error('Validation failed:', error.error.errors);
           
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
    } else {
      console.log('Form is invalid, please fill in all required fields.');
    }
  }


  cancel() {
    this.name = '';
    this.category = '';
    this.no_of_times = null;
  }
}
