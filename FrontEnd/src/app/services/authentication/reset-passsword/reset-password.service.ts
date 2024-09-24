import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private readonly resetPasswordUrl = 'https://yourapi.com:8000/api'; // Replace with sent email API
  constructor(private readonly http: HttpClient) { }

  resetPassword(data: { email: string }) {
    return this.http.post(this.resetPasswordUrl, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}