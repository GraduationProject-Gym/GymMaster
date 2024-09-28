import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private readonly http: HttpClient) { }
  private readonly registrationUrl = `${environment.domain}/register`;

  register(data: FormData) {
    // data.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // }); // Test sent payload
    console.log('111');
    return this.http.post(this.registrationUrl, data);
  }
}
