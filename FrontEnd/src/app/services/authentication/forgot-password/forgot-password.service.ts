import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private readonly http: HttpClient) { }
  private readonly forgotPasswordUrl = "http://localhost:8000/api/forgot-password";

  sendEmail(data: {email: string}) {
    return this.http.post(this.forgotPasswordUrl, data);
  };
}
