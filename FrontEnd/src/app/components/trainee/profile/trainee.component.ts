import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-trainee',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    SidebarComponent,
    EditProfileComponent,
  ],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.css'
})
export class TraineeComponent {
  constructor() {
    this.setProfileImage();
  }
    trainee = [
      {
        name: 'John Doe',
        membership: 'Premium',
        subscription: 'Monthly',
        age:23,
        email:"sandy23@gmail.com",
        phone:"01271024421",
        address:"Asyut",
        gender:"male",
        srcImg:"",

      },
    ];


    setProfileImage() {
      const trainee = this.trainee[0];
      if (!trainee.srcImg) {
        trainee.srcImg = trainee.gender === 'female' ? "/female.jfif" : "/male.jfif";
      }
    }

  }
