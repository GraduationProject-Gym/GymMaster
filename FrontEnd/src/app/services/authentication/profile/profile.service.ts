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

  getUserRole(){
    const getUserRoleUrl = `${environment.domain}/getUserRole`;
    return this.http.get(getUserRoleUrl, { headers: this.getHeaders() });
  }
  
  getProfileData() {
    const profileUrl = `${environment.domain}/showuserdata`;
    return this.http.get(profileUrl, { headers: this.getHeaders() });
  }
}
