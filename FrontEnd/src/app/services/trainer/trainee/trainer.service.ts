import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from '../../auth-token.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }
  private selectedData: any;

  // Get token to send it with request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  // change after BE api 
  // Do review service
  reviewTrainer(data: any): Observable<any> {
    const reviewTrainerUrl = `${environment.domain}/review`;
    return this.http.post(reviewTrainerUrl, { ...data }, { headers: this.getHeaders() });
  }

  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }
}
