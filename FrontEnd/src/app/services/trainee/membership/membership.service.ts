import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenService } from '../../auth-token.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }
  private selectedData: any;

  // Get token to send it with each request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // subsciption service
  subscribeMemberShip(id: number): Observable<any> {
    const subscriptionUrl = `${environment.domain}/subscribe`;
    return this.http.post(subscriptionUrl, { id }, { headers: this.getHeaders() });
  }

  // Setter and getter to move data between components
  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }
}
