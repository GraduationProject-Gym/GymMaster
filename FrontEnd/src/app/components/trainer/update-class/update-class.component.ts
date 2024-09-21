import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    CommonModule
  ],
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent {
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
}
  