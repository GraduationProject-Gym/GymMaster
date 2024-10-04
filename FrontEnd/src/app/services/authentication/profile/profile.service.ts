import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthTokenService } from '../../auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { }

  // Get token to send it with each request
  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return headers;
  }

  private readonly profileUrl = `${environment.domain}/showuserdata`;

  getProfileData() {
    return this.http.get(this.profileUrl, { headers: this.getHeaders() });
  }
}
