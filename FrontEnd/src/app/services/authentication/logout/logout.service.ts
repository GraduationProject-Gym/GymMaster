import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenService } from '../../auth-token.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private readonly http: HttpClient,
    private readonly authTokenService: AuthTokenService,
    private router: Router) { }
  private readonly logoutUrl = `${environment.domain}/logout`;

  logout() {
    // Clear tokens and user data
    this.authTokenService.removeToken();

    // Redirect to the login page or home page
    this.router.navigate(['/login']);
  }
}
