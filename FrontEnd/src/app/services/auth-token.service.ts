import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  login() {
    this.isAuthenticatedSubject.next(true);
  }

  // Call this when the user logs out
  logout() {
    this.isAuthenticatedSubject.next(false);
  }
  checkAuthenticationStatus() {
    const isLoggedIn = this.getToken();/* logic to check if the user is logged in, e.g., token presence */
    this.isAuthenticatedSubject.next(isLoggedIn);
  }

  getToken(): any {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('role');
    }
  }

}

