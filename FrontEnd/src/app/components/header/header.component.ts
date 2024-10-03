import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthTokenService } from '../../services/auth-token.service';
import { LogoutService } from '../../services/authentication/logout/logout.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/authentication/login/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LandingPageComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  role: string | null = null;

  constructor(
    private authTokenService: AuthTokenService,
    private logoutService: LogoutService,
    private router:Router
  ) {
    this.checkLoginStatus();
  }
  data: any;

  profile() {
    this.role = sessionStorage.getItem('role');
    if (this.role === 'trainee'){
      this.router.navigate(['/trainee-profile']);
    } else if (this.role === 'trainer'){
      this.router.navigate(['/trainer-profile']);
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

  roleCheck(): boolean {
    // Role shall be updated based on BE
    return this.isLoggedIn && this.role === "trainee";
  }
}
