import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private readonly http: HttpClient) { }
  private readonly forgotPasswordUrl = `${environment.domain}/forgot-password`;

  sendEmail(data: {email: string}) {
    return this.http.post(this.forgotPasswordUrl, data);
  };
}
