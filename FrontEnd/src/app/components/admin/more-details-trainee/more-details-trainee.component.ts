import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more-details-trainee',
  standalone: true,
  imports: [AdminSidebarComponent,
    CommonModule],
  templateUrl: './more-details-trainee.component.html',
  styleUrl: './more-details-trainee.component.css'
})
export class MoreDetailsTraineeComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}
  trainee: any = {};

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Get the ID from the route
      if (idParam) {
        const id = +idParam; // Convert to number if idParam is not null
        this.trainee = this.trainees.find(t => t.id === id); // Find the trainee by ID
        this.setProfileImage(); // Set default profile images based on gender
      } else {
        console.error('ID parameter is missing');
      }
    });
  }


  // all trainess
  trainees: any[] = [
    {
      name: 'Jane Smith',
      id: 6,
      srcImg: '/female.png',
      age: 28,
      email: "jane28@gmail.com",
      phone: "01023456789",
      address: "Cairo",
      gender: "female",
      classes: ["pilates", "yoga"],
      membership: "Gold",
      subscription: "Annual",
    },
    {
      name: 'Michael Johnson',
      id: 7,
      srcImg: '/male.png',
      age: 30,
      email: "mike30@gmail.com",
      phone: "01123456789",
      address: "Alexandria",
      gender: "male",
      classes: ["zomba", "crossfit"],
      membership: "Silver",
      subscription: "Monthly",
    },
    {
      name: 'Sara Connor',
      id: 8,
      srcImg: '',
      age: 26,
      email: "sara26@gmail.com",
      phone: "01234567890",
      address: "Giza",
      gender: "female",
      classes: ["yoga", "box"],
      membership: "Platinum",
      subscription: "Quarterly",
    },
    {
      name: 'James Bond',
      id: 9,
      srcImg: '/male.png',
      age: 35,
      email: "bond35@gmail.com",
      phone: "01012345678",
      address: "Luxor",
      gender: "male",
      classes: ["martial arts", "zomba"],
      membership: "Gold",
      subscription: "Annual",
    },
    {
      name: 'Emma Watson',
      id: 10,
      srcImg: '/female.png',
      age: 24,
      email: "emma24@gmail.com",
      phone: "01198765432",
      address: "Fayoum",
      gender: "female",
      classes: ["pilates", "yoga"],
      membership: "Silver",
      subscription: "Monthly",
    }
  ];


  // Set default profile images for trainees without a profile picture
  setProfileImage() {
    if (!this.trainee.srcImg) {
      this.trainee.srcImg = this.trainee.gender === 'female' ? "/female.png" : "/male.png";
    }
  }
}

