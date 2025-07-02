import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddMechanicService } from '../../../shared/services/add-mechanic.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-mechanic',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './add-mechanic.html',
})
export class AddMechanic {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addMechanicService: AddMechanicService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      mechanicName: ['', Validators.required],
      expertise: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Please fill out all fields correctly.', 'Validation Error');
      return;
    }

    const mechanicData = this.form.value;

    this.addMechanicService.addMechanic(mechanicData).subscribe({
      next: () => {
        this.toastr.success('Mechanic added successfully!', 'Success');
        this.router.navigate(['/service-center/mechanics']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to add mechanic. Please try again.', 'Error');
      },
    });
  }
}