import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoalService } from '../../../services/trainee/goal/goal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  providers: [GoalService],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {
  goal: string | null = null;
  showForm: boolean = true;
  isEditing: boolean = false;
  newGoal: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private goalService: GoalService, private router: Router) { }


  // Edit the current goal
  editGoal(): void {
    this.showForm = true;
    this.isEditing = true;
    this.newGoal = this.goal!;
  }

  // Add the new goal
  addGoal(): void {
    this.goal = this.newGoal;
    this.showForm = false;
  }

  // Save changes or add the goal
  saveGoal(goals: string): void {
    console.log(goals);
    this.errorMessage = null; // Reset the error message
    this.goalService.addUpdateGoal(goals).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = response.message;
      },
      error: (error) => {
        console.log(error);
        if (error.status === 403) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });

    if (this.isEditing) {
      this.goal = this.newGoal;
    } else {
      this.goal = this.newGoal;
    }
    this.showForm = false;
    this.newGoal = '';
  }

  // Cancel the edit or addition
  cancel(): void {
    this.showForm = false;
    this.newGoal = '';
  }
}
