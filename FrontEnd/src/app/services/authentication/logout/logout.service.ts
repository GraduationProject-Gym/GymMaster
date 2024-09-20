import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private readonly http:HttpClient) { }
  private readonly logoutUrl = "http://localhost:8000/api/logout";

  logout() {
    // Clear tokens and user data
    localStorage.removeItem('authUser'); // or whatever key you use
    sessionStorage.removeItem('authToken'); // if you use session storage

    // Redirect to the login page or home page
    this.router.navigate(['/login']);
  }
}
