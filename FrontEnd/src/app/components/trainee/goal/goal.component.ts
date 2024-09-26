import { Component } from '@angular/core';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {
  goal: string = 'Lose 5 kilograms';





  editGoal() {
    // Logic to edit the goal
  }
}
