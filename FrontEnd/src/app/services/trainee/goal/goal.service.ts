import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private readonly http: HttpClient) { }
  private readonly setGoalUrl = `${environment.domain}/set-goal`;

  register(data: {goal:string}) {
    return this.http.post(this.setGoalUrl, data);
  }
}
