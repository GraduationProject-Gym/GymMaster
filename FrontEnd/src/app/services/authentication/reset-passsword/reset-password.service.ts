import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private token: string | null = null;
  private email: string | null = null;

  constructor(private readonly http: HttpClient) { }

  setTokenAndEmail(token: string, email: string) {
    this.token = token;
    this.email = email;
  }

  resetPassword(password: string, password_confirmation: string) {
    if (!this.token || !this.email) {
      throw new Error("Token and email must be set before making a request.");
    }

    const resetPasswordUrl = `${environment.domain}/reset-password`;
    const payload = {
      token: this.token,
      email: this.email,
      password,
      password_confirmation
    };
    return this.http.post(resetPasswordUrl, payload);
  }
}
