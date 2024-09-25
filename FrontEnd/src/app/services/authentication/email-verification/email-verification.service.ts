import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(private readonly http:HttpClient) { }
  private readonly emailVerificationUrl = "http://localhost:8000/api/email-verification";

  sendVerificationEmail(data: {email: string}) {
    return this.http.post(this.emailVerificationUrl, data);
  };
}
