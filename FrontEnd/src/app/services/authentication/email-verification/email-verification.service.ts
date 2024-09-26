import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {

  constructor(private readonly http:HttpClient) { }
  private readonly emailVerificationUrl = `${environment.domain}/email-verification`;

  sendVerificationEmail(data: {email: string}) {
    return this.http.post(this.emailVerificationUrl, data);
  };
}
