// import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// // import { ClassService } from './class.service';

// @Component({
//   selector: 'app-show-class',
//   templateUrl: './show-class.component.html',
//   styleUrls: ['./show-class.component.css']
// })
// export class ShowClassComponent {
//   className: string = '';
//   sessions: number = 0;
//   status: string = '';
//   equipment: string = '';
//   description: string = '';
//   groups = [];

//   constructor(private router: Router, private route: ActivatedRoute, private classService: ClassService) {}

//   ngOnInit() {
//     const classId = this.route.snapshot.paramMap.get('id');
//     if (classId) {
//       this.classService.getClassById(classId).subscribe(data => {
//         this.className = data.className;
//         this.sessions = data.sessions;
//         this.status = data.status;
//         this.groups = data.groups;
//         this.equipment = data.equipment;
//         this.description = data.description;
//       });
//     }
//   }

//   edit() {
//     const classId = this.route.snapshot.paramMap.get('id');
//     this.router.navigate(['/trainer/update-class', classId]);
//   }

//   cancel() {
//     this.router.navigate(['/trainer/classes']);
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-class',
  standalone: true,
  imports:[ ReactiveFormsModule,
    CommonModule,
  ],

  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})
export class ShowClassComponent {
  className: string = 'Yoga Class';
  sessions: number = 5;
  status: string = 'Active';
  equipment: string = 'Yoga Mats';
  description: string = 'A yoga class focused on flexibility and balance.';

  groups = [
    { days: 'Monday, Wednesday, Friday', hours: '10:00 AM - 11:30 AM' },
    { days: 'Tuesday, Thursday', hours: '6:00 PM - 7:30 PM' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
  }

  edit() {
    this.router.navigate(['/trainer/update-class']);
  }

  cancel() {
    this.router.navigate(['/trainer/classes']);
  }
}
