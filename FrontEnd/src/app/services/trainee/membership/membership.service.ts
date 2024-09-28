import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthTokenService } from '../../auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private readonly http: HttpClient, private readonly authTokenService: AuthTokenService) { 
    
  }
//   private token = this.authTokenService.getToken();
//   private headers = new HttpHeaders({
//    'Authorization': `Bearer ${token}`
//  });

  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    return headers;
    /*return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });*/
  }
  
  showMembership(membership:string) { 
    const showMembershipUrl = `${environment.domain}/membership/${membership}`;
    return this.http.get(showMembershipUrl, { headers: this.getHeaders() });
  }

  indexMemberships() {
    console.log("inside service");
    const indexMembershipsUrl = `${environment.domain}/membership`;
    return this.http.get(indexMembershipsUrl, { headers: this.getHeaders() });
  }
}
