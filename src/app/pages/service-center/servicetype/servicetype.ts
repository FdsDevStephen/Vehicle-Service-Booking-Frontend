import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceTypeService, ServiceType } from '../../../shared/services/service-type.service';

@Component({
  selector: 'app-servicetype',
  standalone: true,
  templateUrl: './servicetype.html',
  imports: [CommonModule, RouterModule],
})
export class ServiceTypeComponent implements OnInit {
  serviceTypes: ServiceType[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private serviceTypeService: ServiceTypeService) {}

  ngOnInit(): void {
    this.serviceTypeService.getAllServiceTypes().subscribe({
      next: (data) => {
        this.serviceTypes = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load service types.';
        this.isLoading = false;
      },
    });
  }

  deleteServiceType(id: number): void {
    if (confirm('Are you sure you want to delete this service type?')) {
      this.serviceTypeService.deleteServiceType(id).subscribe({
        next: () => {
          this.serviceTypes = this.serviceTypes.filter((service) => service.id !== id);
          alert('Service type deleted successfully.');
        },
        error: () => {
          alert('Failed to delete service type.');
        },
      });
    }
  }
}