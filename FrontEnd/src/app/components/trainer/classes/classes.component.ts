import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateClassComponent } from '../update-class/update-class.component';
import { CommonModule } from '@angular/common';
import { ClassService } from '../../../services/trainer/class/class.service';
import { LoginService } from '../../../services/authentication/login/login.service';
@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    UpdateClassComponent
  ],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit{

  constructor(private router: Router,
    private route: ActivatedRoute,
     private classService: ClassService,
     private loginService: LoginService,
    ){}

  // Trainer and class information
  data:any;
  id:number=8;
  i: number = 1;
  image: string = '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif';
  activeClassId: number | undefined;
  errorMessage: string='';

  // List of available classes

  ngOnInit(){
    this.data = this.loginService.getSelectedClass();
    if(!this.data){
      this.classService.getClass().subscribe({
        next: (response) => {
          console.log(response);
            let traineesArray = response;
            this.classService.setSelectedclass(traineesArray);
            this.data = this.classService.getSelectedClass();
        },
        error: (error) => {
          console.log(error);
          if (error.status === 401) {
            // Error in credentials
            this.router.navigate(['/login']);
          } else if (error.status === 403){
            // error in email verification
            // must redirect to another page
            this.errorMessage = error.error?.message;
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
      return;
    }

  }

  // Toggle class details view
  toggleDetails(classId: number) {
    this.activeClassId = this.activeClassId === classId ? undefined : classId;
  }

  // Navigate to the update class page
  goToUpdatePage() {
    this.router.navigate(['/trainer/update-class']);
  }

  // Navigate to the show class page


  // Navigate to the add new class page
  addClass(){
    this.router.navigate(['/trainer/add-class']);
  }

  // Delete a class
  deleteClass(classId: number) {
    // const confirmDelete = confirm('Are you sure you want to delete this class?');
    // if (confirmDelete) {
    //   this.Classes = this.Classes.filter(classItem => classItem.id !== classId);
    //   alert('Class deleted successfully!');
    // }
  }
  goToShowPage(){
    // this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      // console.log(this.id);
      this.classService.getShowClass(this.id).subscribe({
        next: (response) => {
          console.log(response);
          this.classService.setTrainee(response.data);
          this.router.navigate(['/trainer/show-class']);
        },
        //6|TUEzIo5nQg9QMaaQxkZUVhC9EuEcqA9t1KSn4S7Xc1b8a391
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage = error.error?.message || 'You are not authorized to view this class.';
          }else if (error.status === 401) {
            console.log("not Auth");
          this.router.navigate(['login']);
          }
          else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    }
  }

  viewTrainees(){
    if (this.id) {
      console.log(this.id);
      this.classService.geTraineeOnClass().subscribe({
        next: (response) => {
          const traineesArray = response.data;
          console.log(traineesArray);
          this.classService.setTrainee(traineesArray);
          this.router.navigate(['/trainer/trainees']);
        },
        //6|TUEzIo5nQg9QMaaQxkZUVhC9EuEcqA9t1KSn4S7Xc1b8a391
        error: (error) => {
          if (error.status === 403) {
            this.errorMessage = error.error?.message || 'You are not authorized to view this class.';
          }else if (error.status === 401) {
            console.log("not Auth");
            this.router.navigate(['login']);
          }
          else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    }
  }
}
