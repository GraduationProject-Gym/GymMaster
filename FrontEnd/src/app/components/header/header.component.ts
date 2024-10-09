import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AuthTokenService } from '../../services/auth-token.service';
import { LogoutService } from '../../services/authentication/logout/logout.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/authentication/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LandingPageComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn: boolean = false;
  loading: boolean = true;
  role: string | null = null;
  profileData: any = null;
  private authSubscription!: Subscription;

  constructor(
    private authTokenService: AuthTokenService,
    private logoutService: LogoutService,
    private router:Router
  ) {
    // this.checkLoginStatus();
  }
  ngOnInit() {

    this.authTokenService.isAuthenticated$.subscribe((authStatus: boolean) => {
      this.isLoggedIn = authStatus;
      this.loading = false;
      this.role = sessionStorage.getItem('role');
    });

    // this.authSubscription = this.authTokenService.isAuthenticated$.subscribe(
    //   (isAuthenticated: boolean) => {
    //     this.isLoggedIn = isAuthenticated;
    //     console.log(isAuthenticated);
    //     // Uncomment the following block if you want to fetch profile data when the user is logged in
    //     if (this.isLoggedIn) {
    //       /*
    //       this._AuthService.getProfile().subscribe({
    //         next: (response) => {
    //           this.profileData = response;
    //           if (this.profileData?.data) {
    //             // Uncomment this if you want to navigate to the root to refresh the role-specific UI
    //             // this.router.navigate(['/']);
    //           }
    //         },
    //         error: (err) => {
    //           console.error('Error fetching profile:', err);
    //         },
    //       });
    //       */
    //     }
    //   }
    // );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  profile() {
    this.role = sessionStorage.getItem('role');
    if (this.role === 'trainee'){
      this.router.navigate(['/trainee-profile']);
    } else if (this.role === 'trainer'){
      this.router.navigate(['/trainer-profile']);
    }
  }

  class(){
    this.role = sessionStorage.getItem('role');
    if (this.role === 'trainer'){
      this.router.navigate(['/trainer/classes']);
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
  login(){
    this.router.navigate(['/login']);
  }

  logout() {
    this.logoutService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
