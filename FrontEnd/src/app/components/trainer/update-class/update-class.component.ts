import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassService } from '../../../services/trainer/class/class.service';

@Component({
  selector: 'app-update-class',
  standalone: true,
  imports: [ HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [ClassService] ,
  templateUrl: './update-class.component.html',
  styleUrl: './update-class.component.css'
})

  export class UpdateClassComponent {
    className: string = 'Yoga';
    sessions: number = 5;
    status: string = 'active';
    equipment: string = 'Yoga Mats';
    description: string = 'A yoga class focused on flexibility and balance.';
    //api
    // className: string = '';
    // sessions: number = 0;
    // status: string = '';
    // equipment: string = '';
    // description: string = '';

    // groups = [];

    groups = [
      { days: 'Monday, Wednesday, Friday', hours: '10:00 AM - 11:30 AM' },
      { days: 'Tuesday, Thursday', hours: '6:00 PM - 7:30 PM' }
    ];

    constructor(private classService: ClassService,private router: Router) {}
//API

// const classId = this.route.snapshot.paramMap.get('id');
// if (classId) {
//   this.classService.getClassById(classId).subscribe(data => {
//     this.className = data.className;
//     this.sessions = data.sessions;
//     this.status = data.status;
//     this.groups = data.groups;
//     this.equipment = data.equipment;
//     this.description = data.description;
//   });
// }}
// save() {
//   const classId = this.route.snapshot.paramMap.get('id');
//   const updatedClassData = {
//     className: this.className,
//     sessions: this.sessions,
//     status: this.status,
//     groups: this.groups,
//     equipment: this.equipment,
//     description: this.description
//   };
//   if (classId) {
//     this.classService.updateClass(classId, updatedClassData).subscribe(() => {
//       this.router.navigate(['/trainer/classes']);
//     });
//   }
// }

    save() {
      console.log('Updated Class Info:', {
        className: this.className,
        sessions: this.sessions,
        status: this.status,
        groups: this.groups,
        equipment: this.equipment,
        description: this.description
      });

      this.router.navigate(['/trainer/classes']);
    }

    cancel() {
      this.router.navigate(['/trainer/classes']);
    }
  }
