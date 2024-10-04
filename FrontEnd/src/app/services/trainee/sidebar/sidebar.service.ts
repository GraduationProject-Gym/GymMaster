import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from '../../auth-token.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }
  private selectedData: any;

  // Get token to send it with each request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  getProfileData():Observable <any>{
    const profileUrl = `${environment.domain}/showuserdata`;
    return this.http.get(profileUrl, { headers: this.getHeaders() });
  }

  // Membership services
  // showMembership(membership:string) { 
  //   const showMembershipUrl = `${environment.domain}/membership/${membership}`;
  //   return this.http.get(showMembershipUrl, { headers: this.getHeaders() });
  // }

  indexMemberships(): Observable<any> {
    const indexMembershipsUrl = `${environment.domain}/membership`;
    return this.http.get(indexMembershipsUrl, { headers: this.getHeaders() });
  }

  // Classes services
  indexMyClasses(): Observable<any> {
    const showMyClassesUrl = `${environment.domain}/trainee-class/joined-classes`;
    return this.http.post(showMyClassesUrl, {}, { headers: this.getHeaders() });
  }

  indexClasses(): Observable<any> {
    const indexClassesUrl = `${environment.domain}/gym-classes`;
    return this.http.get(indexClassesUrl, { headers: this.getHeaders() });
  }

  // Trainer service
  indexMyTrainers(): Observable<any> {
    const indexMyTrainersUrl = `${environment.domain}/`;
    return this.http.get(indexMyTrainersUrl, { headers: this.getHeaders() });
  }

  // Review services
  // indexMyReviews(): Observable<any> {
  //   const reviewTrainerUrl = `${environment.domain}/review`;
  //   return this.http.get(reviewTrainerUrl, { headers: this.getHeaders() });
  // }

  // Attendance service
  indexMyAttendance(): Observable<any> {
    const indexMyAttendanceUrl = `${environment.domain}/attendance`;
    return this.http.post(indexMyAttendanceUrl, {}, { headers: this.getHeaders() });
  }

  // Setter and getter to move data between components
  setSelectedData(data: any) {
    this.selectedData = data;
    console.log(this.selectedData);
  }
  
  getSelectedData() {
    console.log(this.selectedData);
    return this.selectedData;
  }
}
