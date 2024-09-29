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
  private selectedData:any;

  private getHeaders(): HttpHeaders {
    const token = this.authTokenService.getToken();
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);
    return headers;
  }
  
  showMembership(membership:string) { 
    const showMembershipUrl = `${environment.domain}/membership/${membership}`;
    return this.http.get(showMembershipUrl, { headers: this.getHeaders() });
  }

  indexMemberships():Observable <any> {
    console.log("inside service");
    const indexMembershipsUrl = `${environment.domain}/membership`;
    return this.http.get(indexMembershipsUrl, { headers: this.getHeaders() });
  }
  
  setSelectedData(data:any){
    this.selectedData = data;
  }

  getSelectedData(){
    return this.selectedData;
  }
}
