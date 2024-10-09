import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthTokenService } from '../../services/auth-token.service';
import { LogoutService } from '../../services/authentication/logout/logout.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/authentication/login/login.service';
import { ProfileService } from '../../services/authentication/profile/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LandingPageComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  role: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private authTokenService: AuthTokenService,
    private profileService: ProfileService,
    private logoutService: LogoutService,
    private router: Router
  ) {
    this.checkLoginStatus();
  }

  ngOnInit(): void {
    this.getRole();
  }

  getRole() {
    this.errorMessage = null;
    this.profileService.getUserRole().subscribe({
      next: (response: any) => {
        console.log(response);
        this.role = response.role;
      },
      error: (error) => {
        console.log(error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.errorMessage = error.error?.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }

  profile() {
    if (this.role === 'trainee') {
      this.router.navigate(['/trainee-profile']);
    } else if (this.role === 'trainer') {
      this.router.navigate(['/trainer-profile']);
    }
  }

  class() {
    this.role = sessionStorage.getItem('role');
    if (this.role === 'trainer') {
      this.router.navigate(['/trainer/classes']);
    }
  }

  trainers() {
    this.role = sessionStorage.getItem('role');
    if (this.role === 'admin') {
      this.router.navigate(['/admin-trainers']);
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!this.authTokenService.getToken();
  }

  toggleMenu(): void {
    const collapse = document.querySelector('#navbarNav') as HTMLElement;
    collapse.classList.toggle('show');
  }

  closeMenu(): void {
    const collapse = document.querySelector('#navbarNav') as HTMLElement;
    if (collapse.classList.contains('show')) {
      collapse.classList.remove('show');
    }
  }

  logout(): void {
    this.logoutService.logout();
    this.isLoggedIn = false;
  }
}
