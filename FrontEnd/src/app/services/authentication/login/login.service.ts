import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  private readonly loginUrl = `${environment.domain}/login`;

  login(data: { email: string, password: string, device_name: string }):Observable <any> {
    // console.log(data); // Test sent payload
    return this.http.post(this.loginUrl, data).pipe(tap((response: any) => {
      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        sessionStorage.setItem('role',response.role);
      }
    }));
  }
}

