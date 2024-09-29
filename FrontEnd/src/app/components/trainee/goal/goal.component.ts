import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [SidebarComponent, FormsModule, CommonModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {
  goal: string | null = null;
  showForm: boolean = true;
  isEditing: boolean = false;
  newGoal: string = '';

  constructor() { }

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
  saveGoal(): void {
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
