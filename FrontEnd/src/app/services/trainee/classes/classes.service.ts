import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from '../../auth-token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }
  private selectedData: any;

  // Get token to send it with request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // Classes services
  joinClass(class_id: number): Observable<any> {
    const joinClassUrl = `${environment.domain}/trainee-class`;
    return this.http.post(joinClassUrl, {'class_id':class_id}, { headers: this.getHeaders() });
  }

  // // Setter and getter to move data between components
  // setSelectedData(data: any) {
  //   this.selectedData = data;
  // }

  // getSelectedData() {
  //   return this.selectedData;
  // }
}