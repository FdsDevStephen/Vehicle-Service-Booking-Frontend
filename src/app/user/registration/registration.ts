import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth';
import { ToastrService } from 'ngx-toastr';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration implements OnInit {
  form: FormGroup;
  isSubmitted = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')
      ]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      role: ['', Validators.required],
      serviceCenterName: [''],
      serviceCenterLocation: [''],
      serviceCenterContact: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.form.get('role')?.valueChanges.subscribe(role => {
      this.updateValidatorsBasedOnRole(role);
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : group.get('confirmPassword')?.setErrors({ mismatch: true });
  }

  updateValidatorsBasedOnRole(role: string): void {
    const name = this.form.get('serviceCenterName');
    const loc = this.form.get('serviceCenterLocation');
    const contact = this.form.get('serviceCenterContact');

    if (role === 'ServiceCenter') {
      name?.setValidators([Validators.required]);
      loc?.setValidators([Validators.required]);
      contact?.setValidators([Validators.required]);
    } else {
      name?.clearValidators();
      loc?.clearValidators();
      contact?.clearValidators();
    }

    name?.updateValueAndValidity();
    loc?.updateValueAndValidity();
    contact?.updateValueAndValidity();
  }

  selectRole(role: string) {
    this.form.get('role')?.setValue(role);
    this.updateValidatorsBasedOnRole(role);
  }
  

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      this.toastr.error('Please correct the form fields.', 'Validation Error');
      return;
    }

    this.authService.createUser(this.form.value).subscribe({
      next: (res) => {
        if ( res === true || res?.success || typeof res === 'string') {
          this.toastr.success('Registration successful!', 'Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.warning('Something unexpected happened. Please check.', 'Warning');
        }
        
      },
      error: (err) => {
        console.error(err);
      
        // ✅ If backend sends plain string
        if (typeof err.error === 'string') {
          this.toastr.error(err.error, 'Error');
        }
      
        // ✅ If backend sends ModelState-style errors
        else if (err.error && err.error.errors) {
          const messages = Object.values(err.error.errors).flat() as string[];
          messages.forEach((msg) => this.toastr.error(msg, 'Validation Error'));
        }
      
        // ❌ Fallback error message
        else {
          this.toastr.error('Registration failed. Please try again.', 'Error');
        }
      }
      
    });
  }
}