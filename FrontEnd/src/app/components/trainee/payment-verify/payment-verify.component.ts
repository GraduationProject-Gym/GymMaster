import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MembershipService } from '../../../services/trainee/membership/membership.service';

@Component({
  selector: 'app-payment-verify',
  standalone: true,
  imports: [],
  templateUrl: './payment-verify.component.html',
  styleUrl: './payment-verify.component.css'
})
export class PaymentVerifyComponent implements OnInit {
  message: string = '';
  status: string | null = null;
  member_id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.status = params['status'];
      this.member_id = +params['member_id'];
      this.handlePaymentStatus(this.status);
    });
  }

  private handlePaymentStatus(status: string | null): void {
    if (status === 'success') {

      this.callPaymentSuccessApi();

    } else if (status === 'cancel') {

      // this.callPaymentCancelApi();

    } else {
      this.message = 'No payment status provided.';

    }
  }


  private callPaymentSuccessApi(): void {

    if (this.member_id) {
      this.message = 'Payment was successful!';
      this.membershipService.paymentSuccess(this.member_id).subscribe({
        next: (response) => {
          this.router.navigate(['/trainee-profile']);
          // console.log('Success API called:', response);
        },
        error: (error) => {
          console.error('Error calling success API:', error);
        }
      });
    }
  }


  // private callPaymentCancelApi(): void {

  //   if (this.member_id) {
  //     this.message = 'Payment was canceled.';
  //     this.membershipService.paymentCancel(this.member_id).subscribe({
  //       next: (response) => {
  //         console.log('Cancel API called:', response);
  //         this.router.navigate([/cousres/${this.courseId}]);
  //       },
  //       error: (error) => {
  //         console.error('Error calling cancel API:', error);
  //       }
  //     });
  //   }
  // }

  // goToCourses(): void {
  //   if (this.courseId) {
  //     this.router.navigate([/cousres/${this.courseId}/cousrematerial]);
  //   } else {
  //     this.router.navigate(['/courses']);
  //   }
  // }
}
