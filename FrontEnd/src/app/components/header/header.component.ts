import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthTokenService } from '../../services/auth-token.service';
import { LogoutService } from '../../services/authentication/logout/logout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LandingPageComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authTokenService: AuthTokenService, private logoutService: LogoutService) {
    this.checkLoginStatus();
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
