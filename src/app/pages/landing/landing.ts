import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth'; // Adjust path
 
@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [CommonModule, RouterModule, FormsModule, Header, Footer],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class Landing {
  showLoginModal = false;
  email = '';
  password = '';
  mobileMenuOpen = false; // <-- New state
 
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
 
  toggleLoginModal() {
    this.showLoginModal = !this.showLoginModal;
  }
 
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
 
  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
 
  login() {
    if (!this.email || !this.password) {
      this.toastr.error('Email and Password required', 'Validation');
      return;
    }
 
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        const role = this.authService.getUserRoles();
        this.toastr.success('Login successful!', 'Welcome');
        this.toggleLoginModal();
        this.mobileMenuOpen = false;
 
        if (role === 'User') {
          this.router.navigate(['/user-dashboard']);
        } else if (role === 'ServiceCenter') {
          this.router.navigate(['/service-center-dashboard']);
        }
      },
      error: (err) => {
        this.toastr.error('Invalid credentials', 'Login Failed');
      }
    });
  }
 
  closeModalOutside() {
    this.showLoginModal = false;
  }
}
 
 