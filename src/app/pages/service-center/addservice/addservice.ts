import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceTypeService } from '../../../shared/services/service-type.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addservice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addservice.html',
})
export class AddServiceComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceTypeService: ServiceTypeService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Validation Error');
      return;
    }

    const serviceData = this.form.value;

    this.serviceTypeService.createServiceType(serviceData).subscribe({
      next: () => {
        this.toastr.success('Service added successfully!', 'Success');
        this.router.navigate(['/service-center/manage-services']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to add service. Please try again.', 'Error');
      },
    });
  }
}