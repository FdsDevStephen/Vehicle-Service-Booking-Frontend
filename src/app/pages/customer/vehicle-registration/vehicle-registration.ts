import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../shared/services/vehicle.service';

@Component({
  selector: 'app-vehicle-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './vehicle-registration.html',
  styleUrls: ['./vehicle-registration.css']
})
export class VehicleRegistration implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      registrationNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Validation Error');
      return;
    }

    this.vehicleService.registerVehicle(this.form.value).subscribe({
      next: () => {
        this.toastr.success('Vehicle registered successfully!', 'Success');
        this.router.navigate(['/user-dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to register vehicle.', 'Error');
      }
    });
  }
}
