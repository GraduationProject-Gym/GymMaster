import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from '../auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // Schedule services
  indexSchedules(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/schedules`;
    return this.http.get(indexTraineesUrl);
  }
}
