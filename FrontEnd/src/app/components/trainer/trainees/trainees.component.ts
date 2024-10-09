import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { ClassService } from '../../../services/trainer/class/class.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trainees',
  standalone: true,
  imports: [CommonModule, FormsModule,
    RouterModule
  ],
  templateUrl: './trainees.component.html',
  styleUrls: ['./trainees.component.css']
})
export class TraineesComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;
  traineees: any[] = [];
  constructor(private router: Router, private classService: ClassService, private route: ActivatedRoute) {
  }

  groupedTrainees: any[] = [];
  currentSlide: number = 0;
  errorMessages: { [userId: number]: string } = {};
  vailedMessages: { [userId: number]: string } = {};
  ngOnInit() {
    this.traineees = this.classService.getTrainee();
    if(!this.traineees){
      this.updateData();
    }else{
      const groupSize = 3;
      const traineesArray = this.traineees;
      for (let i = 0; i < traineesArray.length; i += groupSize) {
        this.traineees[i].showReview = false;
        this.groupedTrainees.push(traineesArray.slice(i, i + groupSize));
      }
    }
  }

  toggleReview(trainee: any) {
    trainee.showReview = !trainee.showReview;
  }


  // createReport(){}

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateCarousel();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.groupedTrainees.length - 1) {
      this.currentSlide++;
      this.updateCarousel();
    }
  }
  updateCarousel() {
    const carouselItems = this.carousel.nativeElement.querySelectorAll('.carousel-item');
    carouselItems.forEach((item: { classList: { remove: (arg0: string) => void; add: (arg0: string) => void; }; }, index: number) => {
      item.classList.remove('active');
      if (index === this.currentSlide) {
        item.classList.add('active');
      }
    });
  }

  updateData(){
    this.classService.geTraineeOnClass().subscribe({
      next: (response) => {
        let traineesArrays = response.data;
        console.log(traineesArrays);
        this.classService.setTrainee(traineesArrays);
        this.traineees = response.data;//this.classService.getTrainee();
        const groupSize = 3;
        const traineesArray = this.traineees;
        for (let i = 0; i < traineesArray.length; i += groupSize) {
          this.traineees[i].showReview = false;
          this.groupedTrainees.push(traineesArray.slice(i, i + groupSize));
        }
        },
      error: (error) => {
        if (error.status === 403) {
          // this.errorMessage = error.error?.message || 'You are not authorized to view this class.';
          
        }else if (error.status === 401) {
          // console.log("not Auth");
          this.router.navigate(['login']);
        }
        else {
          // this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  addReview(userId:string | null, comment:string|null , rate:string| null){
    let user_id: number = userId? Number(userId):0;
    let rating: number = rate? Number(rate):0;

    const newReview = {
      'user_id': user_id,
      'comments': comment,
      'rating': rating,
    };

    if (user_id) {
      this.classService.setReview(newReview).subscribe({
        next: (response) => {
          console.log(response);
          this.classService.setSelectedclass(response.data);
          this.vailedMessages[user_id]= "done";
          window.location.href = `/trainer/trainees`;
          setTimeout(() => {
            this.vailedMessages[user_id]= "";
          }, 5000);
        },
        error: (error) => {
          console.log(error);

          if (error.status === 403) {
              if (error.error?.message) {
                Object.keys(error.error.message).forEach(key => {
                  this.errorMessages[user_id]= error.error.message[key];
                   setTimeout(() => {
                    this.errorMessages[user_id]= "";
                  }, 5000);
                });

          }}else if (error.status === 401) {
            // console.log("not Auth");
            this.router.navigate(['login']);
          }
          else {
            this.errorMessages[user_id] = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
    }
  }
  addReport(userId: string | null) {
    let user_id: number = userId ? Number(userId) : 0;
    this.classService.createReport(user_id).subscribe({
      next: (response) => {
        console.log(response);
        this.classService.setReport(response);
        this.router.navigate(['/trainer/trainees/create-report/', user_id]);
      },
      error: (error) => {
        console.log(error);
        if (error.status === 403) {
          if (error.error?.message) {
            Object.keys(error.error.message).forEach(key => {
              this.errorMessages[user_id] = error.error.message[key];
              setTimeout(() => {
                delete this.errorMessages[user_id];
              }, 5000);
            });
          }
        } else if (error.status === 401) {
          // console.log("not Auth");
          this.router.navigate(['login']);
        }
        else {
          this.errorMessages[user_id] = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

}
// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }



// trainees: any[] = [
//   {
//     name: 'SANDY SAMIR1',
//     sessionsAttended: 4,
//     membership: 'VIP',
//     subscription: 'Month',
//     image: '/assets/Woman athlete exercising with kettlebell.jfif',
//     showReview: false,
//     Reviews: [
//       { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
//       { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
//     ],
//     tempReview: { comment: '', rate: 1 }
//   },  {
//     name: 'SANDY SAMIR2',
//     sessionsAttended: 4,
//     membership: 'VIP',
//     subscription: 'Month',
//     image: '/assets/Woman athlete exercising with kettlebell.jfif',
//     showReview: false,
//     Reviews: [
//       { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
//       { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
//     ],
//     tempReview: { comment: '', rate: 1 }
//   },  {
//     name: 'SANDY SAMIRnm3',
//     sessionsAttended: 4,
//     membership: 'VIP',
//     subscription: 'Month',
//     image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
//     showReview: false,
//     Reviews: [
//       { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
//       { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
//     ],
//     tempReview: { comment: '', rate: 1 }
//   },  {
//     name: 'SANDY SAMIRww4',
//     sessionsAttended: 4,
//     membership: 'VIP',
//     subscription: 'Month',
//     image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
//     showReview: false,
//     Reviews: [
//       { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
//       { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
//     ],
//     tempReview: { comment: '', rate: 1 }
//   },  {
//     name: 'SANDY SAMIRmm5',
//     sessionsAttended: 4,
//     membership: 'VIP',
//     subscription: 'Month',
//     image: '/10 Easy Yoga Poses To Alleviate Anxiety And Depression.jfif',
//     showReview: false,
//     Reviews: [
//       { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
//       { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
//     ],
//     tempReview: { comment: '', rate: 1 }
//   },  {
//     name: 'SANDY SAMIRyyy6',
//     sessionsAttended: 4,
//     membership: 'VIP',
//     subscription: 'Month',
//     image: '/assets/Woman athlete exercising with kettlebell.jfif',
//     showReview: false,
//     Reviews: [
//       { date: '2024-09-10', attendens: 'Present', comment: 'Great session!', rate: 5 },
//       { date: '2024-09-12', attendens: 'Absent', comment: 'Missed the class', rate: 0 }
//     ],
//     tempReview: { comment: '', rate: 1 }
//   },
// ];
