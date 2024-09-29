import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router } from '@angular/router';
import { UpdateClassComponent } from '../update-class/update-class.component';
import { CommonModule } from '@angular/common';
import { Init } from 'v8';

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
export class ClassesComponent {

  constructor(private router: Router){}

  // Trainer and class information
  name: string = 'Sandy Samir';
  className: string = 'Yoga';
  image: string = '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif';
  description: string = 'Strength training focuses on increasing muscle strength and mass through weight lifting and resistance exercises.';
  totalNoOfSession:number=8;
  activeClassId: number | undefined;
  status: string = 'Active';
  equipments =[
    {name:"Yoga Mat"},
    {name:"Resistance Bands"},
  ];
  exercises =[
    {name:"Downward Dog"},
    {name:"Warrior Pose"},
    {name:"Tree Pose"},
  ];

  // List of available classes
  Classes = [
    {
      id: 1,
      session: 'Session 1',
      days: 'Monday',
      hours: '10:00 AM - 4:00 PM',
    },
    {
      id: 2,
      session: 'Session 2',
      days: 'Saturday ',
      hours: '11:00 AM - 5:00 PM',
    }
  ];









  // Toggle class details view
  toggleDetails(classId: number) {
    this.activeClassId = this.activeClassId === classId ? undefined : classId;
  }

  // Navigate to the update class page
  goToUpdatePage() {
    this.router.navigate(['/trainer/update-class']);
  }

  // Navigate to the show class page
  goToShowPage(){
    this.router.navigate(['/trainer/show-class']);
  }

  // Navigate to the add new class page
  addClass(){
    this.router.navigate(['/trainer/add-class']);
  }

  // Delete a class
  deleteClass(classId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this class?');
    if (confirmDelete) {
      this.Classes = this.Classes.filter(classItem => classItem.id !== classId);
      alert('Class deleted successfully!');
    }
  }
}
