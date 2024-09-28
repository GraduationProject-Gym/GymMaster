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
    // traineeName: string = 'John Doe';
    trainee = [
      {
        name: 'John Doe',
        trainerName: 'Coach Smith',
        className: 'Yoga',
        sessionsAttended: 10,
        membership: 'Premium',
        subscription: 'Monthly',
        age:23,
        email:"sandy23@getMaxListeners.com",
        phone:"01271024421",
        address:"Asyut",
        gender:"female",
        totalNoOfSession:8,
        exercise: 'Downward Dog, Warrior Pose, Tree Pose',
        equipment: 'Yoga Mat, Resistance Bands',
        showComments: false,
              // Array of feedback comments with ratings
        comments: [
          { comment: 'This is the first comment', rate: 4 },
          { comment: 'Great post!', rate: 3 },
          { comment: 'Thanks for sharing!', rate: 5 },
          { comment: 'Really insightful post.', rate: 2 },
          { comment: 'Fantastic work!', rate: 5 }
        ]
      },
    ];
    membershipType: string = 'Gold';
    subscriptionDate: string = '01/01/2024';
    goal: string = 'Lose 5 kilograms';
    expirationDate: string = '01/01/2025';
    subscriptionCost: number = 2000;
    paymentHistory = [
      { date: '01/01/2024', amount: 2000 }
    ];
    currentClasses: string[] = ['Yoga', 'Zumba'];
    equipment = [
      { name: 'Weights', details: '10 kg' },
      { name: 'Cardio Machines', details: '3 Units' }
    ];
    attendanceDates: string[] = ['10/09/2024'];
    absenceDates: string[] = ['15/09/2024'];
    weightLoss: number = 2;
    discountVoucher: string = '20%';
    trainerRating: string = '★★★★☆';

    editGoal() {
      // Logic to edit the goal
    }

    renewMembership() {
      // Logic to renew membership
    }

    addPaymentMethod() {
      // Logic to add payment method
    }

    viewMoreClasses() {
      // Logic to view more classes
    }

    viewMoreReports() {
      // Logic to view more reports
    }

    useVoucher() {
      // Logic to use voucher
    }

    addNewReview() {
      // Logic to add new review
    }
  }
