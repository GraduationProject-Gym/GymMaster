import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from '../auth-token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }
  private selectedData: any;

  // Get token to send it with each request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // Trainer service
  // indexTrainers(): Observable<any> {
  //   const indexTrainersUrl = `${environment.domain}/`;
  //   return this.http.get(indexTrainersUrl, { headers: this.getHeaders() });
  // }

  // Trainee services
  // indexTrainees(): Observable<any> {
  //   const indexTraineesUrl = `${environment.domain}/`;
  //   return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  // }

  // Attendance
  // indexMyAttendance(): Observable<any> {
  //   const indexMyAttendanceUrl = `${environment.domain}/`;
  //   return this.http.get(indexMyAttendanceUrl, { headers: this.getHeaders() });
  // }

  // Setter and getter to move data between components
  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }
}
