import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth'; // Adjust the path as necessary
import { ToastrService } from 'ngx-toastr';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer]
})
export class Login implements OnInit {
  form: FormGroup;
  role: string = 'user';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Validation Error');
      return;
    }
  
    const loginPayload = {
      email: this.form.value.email,
      password: this.form.value.password
    };
  
    this.authService.login(loginPayload).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token); // Store JWT
        const role = this.authService.getUserRoles(); // Decode role from JWT
        this.toastr.success('Login successful!', 'Welcome');
  
        if (role === 'User') {
          this.router.navigate(['/user-dashboard']);
        } else if (role === 'ServiceCenter') {
          this.router.navigate(['/service-center-dashboard']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.toastr.error('Login failed. Please check your credentials.', 'Error');
      }
    });
  }
  
}
