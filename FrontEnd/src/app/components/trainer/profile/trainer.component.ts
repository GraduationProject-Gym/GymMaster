import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainer',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
  ],
  templateUrl: './trainer.component.html',
  styleUrl: './trainer.component.css'
})
export class TrainerComponent {
  constructor() {
    this.setProfileImage();
  }
  trainee = [
    {
      name: 'John Doe',
      membership: 'Premium',
      subscription: 'Monthly',
      age: 23,
      email: "sandy23@gmail.com",
      phone: "01271024421",
      address: "Asyut",
      gender: "male",
      srcImg: "",

    },
  ];

  setProfileImage() {
    const trainee = this.trainee[0];
    if (!trainee.srcImg) {
      trainee.srcImg = trainee.gender === 'female' ? "/female.png" : "/male.png";
    }
  }
}
