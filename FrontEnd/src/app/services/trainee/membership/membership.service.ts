import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private readonly http:HttpClient) { }
  // private readonly showMembershipUrl = `${environment.domain}/membership/${membership}`;
  private readonly indexMembershipsUrl = `${environment.domain}/membership`;

  showMembership() { 
    return this.http.get(this.indexMembershipsUrl);
  }

  indexMemberships() { 
    return this.http.get(this.indexMembershipsUrl);
  }
}
