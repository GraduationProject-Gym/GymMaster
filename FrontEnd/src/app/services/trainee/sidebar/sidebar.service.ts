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
  showMyClasses(id:number) { 
    const showMyClassesUrl = `${environment.domain}/gym-classes/{id}`;
    return this.http.get(showMyClassesUrl, { headers: this.getHeaders() });
  }

  indexClasses(): Observable<any> {
    const indexClassesUrl = `${environment.domain}/gym-classes`;
    return this.http.get(indexClassesUrl, { headers: this.getHeaders() });
  }

  // Setter and getter to move data between components
  setSelectedData(data: any) {
    this.selectedData = data;
  }

  getSelectedData() {
    return this.selectedData;
  }
}
