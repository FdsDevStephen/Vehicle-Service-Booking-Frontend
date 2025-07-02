import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth'; // adjust path
 
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule, RouterModule]
})
export class Header implements OnInit {
  @Input() showLoginModal: boolean = false;
  @Output() loginToggle = new EventEmitter<void>();
 
  authService = inject(AuthService);
  router = inject(Router);
 
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  mobileMenuOpen = false;
 
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userRole = this.authService.getUserRoles(); // 'User' or 'ServiceCenter'
  }
 
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
 
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
 
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
 
  toggleLogin() {
    this.loginToggle.emit();
    this.closeMobileMenu();
  }
}