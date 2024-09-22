import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UpdateClassComponent } from '../update-class/update-class.component';

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
  constructor(private router: Router){};

  name: string = 'Sandy Samir';
  className: string = 'Yoga';
  image: string = '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif';
  description: string = 'Strength training focuses on increasing muscle strength and mass through weight lifting and resistance exercises.';
  activeGroup: string | undefined;
  groups = [
    {
      id: 'group1',
      title: 'Group 1',
      days: 'Monday - Friday',
      hours: '10:00 AM - 4:00 PM',
    },
    {
      id: 'group2',
      title: 'Group 2',
      days: 'Saturday - Sunday',
      hours: '11:00 AM - 5:00 PM',

    }
  ];

  toggleDetails(group: string) {
    this.activeGroup = this.activeGroup === group ? undefined : group;
  }

  goToUpdatePage() {
    this.router.navigate(['/trainer/update-class']);
  }
}
