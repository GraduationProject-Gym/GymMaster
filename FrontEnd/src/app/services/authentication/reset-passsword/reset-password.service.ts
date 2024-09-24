import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  resetPassword(newPassword: string) {
    if (!this.token || !this.email) {
      throw new Error("Token and email must be set before making a request.");
    }

    const resetPasswordUrl = `http://localhost:8000/api/reset-password?token=${this.token}&email=${this.email}`;
    const payload = {
      token: this.token,
      email: this.email,
      newPassword
    }; return this.http.post(resetPasswordUrl, { payload });
  }
}
