import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from '../auth-token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // indexTrainees() {
  //   throw new Error('Method not implemented.');
  // }
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

  // Classes services
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

  // Setter and getter to move data between components
  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }

  // setSelectedTraineesData(data: any) {
  //   this.selectedTraineesData = data;
  // }

  // getSelectedTraineesData() {
  //   return this.selectedTraineesData;
  // }
}
