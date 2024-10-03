import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from '../../auth-token.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }

  // Get token to send it with request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // Send request
  addUpdateGoal(goals:string): Observable <any> {
    console.log(goals);
    const goalUrl = `${environment.domain}/goals`;
    return this.http.post(goalUrl, {goals}, { headers: this.getHeaders() });
  }
}
