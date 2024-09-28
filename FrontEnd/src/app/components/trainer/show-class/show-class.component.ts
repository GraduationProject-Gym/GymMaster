import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassService } from '../../../services/trainer/class/class.service';

@Component({
  selector: 'app-show-class',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './show-class.component.html',
  styleUrls: ['./show-class.component.css']
})
export class ShowClassComponent implements OnInit{

  id: string = '2';
  sessions: number = 0;
  status: string = '';
  equipment: string = '';
  class:any;

  groups = [
    { days: 'Monday', hours: '10:00 AM - 11:30 AM' },
    { days: 'Thursday', hours: '6:00 PM - 7:30 PM' }
  ];

  errorMessage: string = '';

  constructor(private router: Router ,private classService:ClassService) {}

  ngOnInit(){
    this.class = this.classService.getSelectedClass();
    if(!this.class){
      this.router.navigate(['/trainer/classes']);
      return;
    }
    this.status = this.class.status === 1 ? 'Active' : 'Inactive';
  }

  edit() {
    this.router.navigate(['/trainer/update-class', this.id]);
  }

  cancel() {
    this.router.navigate(['/trainer/classes']);
  }
}
