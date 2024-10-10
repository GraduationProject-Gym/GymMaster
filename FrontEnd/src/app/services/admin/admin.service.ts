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
  private selectedTraineesData: any;

  // Get token to send it with each request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // Trainer service
  indexTrainers(): Observable<any> {
    const indexTrainersUrl = `${environment.domain}/alltrainers`;
    return this.http.get(indexTrainersUrl, { headers: this.getHeaders() });
  }

  // Trainee services
  indexTrainees(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/alltrainees`;
    return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  }

  addClass(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/component-add-class`;
    return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  }

  createClass(data: any): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/gym-classes`;
    return this.http.post(indexTraineesUrl, { ...data }, { headers: this.getHeaders() });
  }

  checkIn(user_id: number) {
    const checkInUrl = `${environment.domain}/attendance/checkin`;
    return this.http.post(checkInUrl, { "user_id": user_id }, { headers: this.getHeaders() });
  }

  checkOut(user_id: number) {
    const checkInUrl = `${environment.domain}/attendance/checkout`;
    return this.http.post(checkInUrl, { "user_id": user_id }, { headers: this.getHeaders() });
  }

  indexAttendanceHistory(user_id: number) {
    const indexAttendanceHistoryURL = `${environment.domain}/attendance`;
    return this.http.post(indexAttendanceHistoryURL, { "user_id": user_id }, { headers: this.getHeaders() });
  // Classes services
  }
  indexClasses(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/gym-classes`;
    return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  }

   // Equipments services
   indexEquipments(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/equipments`;
    return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  }

  // Exercises services
  indexExercises(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/exercises`;
    return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  }

  // Membership services
  indexMemberships(): Observable<any> {
    const indexTraineesUrl = `${environment.domain}/membership`;
    return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  }

  // Setter and getter to move data between components
  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }

  setTools(data: any) {
    this.selectedData = data;
  }
  getTools() {
    return this.selectedData;
  }

  // setSelectedTraineesData(data: any) {
  //   this.selectedTraineesData = data;
  // }

  // getSelectedTraineesData() {
  //   return this.selectedTraineesData;
  // }

  // addClass(): Observable<any> {
  //   const indexTraineesUrl = `${environment.domain}/component-add-class`;
  //   return this.http.get(indexTraineesUrl, { headers: this.getHeaders() });
  // }

  // createClass(data:any): Observable<any>{
  //   const indexTraineesUrl = `${environment.domain}/gym-classes`;
  //   return this.http.post(indexTraineesUrl,{...data},{ headers: this.getHeaders() });
  // }

  getReports(): Observable<any> {
    const getOwnerReports = `${environment.domain}/reportAdmin`;
    return this.http.get(getOwnerReports, { headers: this.getHeaders() });
  }
  addEquipment(data:any): Observable<any>{
    const indexTraineesUrl = `${environment.domain}/equipments`;
    return this.http.post(indexTraineesUrl,{...data},{ headers: this.getHeaders() });
  }

  addExercise(data:any): Observable<any>{
    const indexTraineesUrl = `${environment.domain}/exercises`;
    return this.http.post(indexTraineesUrl,{...data},{ headers: this.getHeaders() });
  }
}
