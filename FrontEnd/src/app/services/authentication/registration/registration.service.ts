import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private readonly http: HttpClient) { }
  private readonly registrationUrl = "http://localhost:8000/api/register";

  register(data: FormData) {
    // const headers = new HttpHeaders({
    //   // 'Accept': 'application/json',
    //   "Content-Type": "application/json",
    //   "Accept": "application/json",
    //   "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    //   "X-Custom-Header": "CustomValue"
    //   // You can add more headers here if needed
    // });
    console.log(data); // Test sent payload
    return this.http.post(this.registrationUrl, data);
  }
}
