import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { ServiceCenterService } from '../../../shared/services/service-center.service';
import { ServiceTypeService } from '../../../shared/services/service-type.service';
import { BookingService } from '../../../shared/services/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-service',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-service.html',
  styleUrl: './book-service.css'
})
export class BookService implements OnInit {
  private router = inject(Router);
  private vehicleService = inject(VehicleService);
  private serviceCenterService = inject(ServiceCenterService);
  private serviceTypeService = inject(ServiceTypeService);
  private bookingService = inject(BookingService);
  private toastr = inject(ToastrService);

  serviceBooking = {
    vehicleId: '',
    serviceCenterId: '',
    serviceTypeId: '',
    date: '',
    time: ''
  };

  vehicles: any[] = [];
  serviceCenters: any[] = [];
  filteredServiceCenters: any[] = [];
  uniqueLocations: string[] = [];
  selectedLocation: string = '';

  serviceTypes: any[] = [];
  selectedPrice: number | null = null;
  minDate: string = '';

  ngOnInit(): void {
    this.loadVehicles();
    this.loadServiceCenters();
    this.loadServiceTypes();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  loadVehicles() {
    this.vehicleService.getUserVehicles().subscribe({
      next: (res) => (this.vehicles = res),
      error: (err) => console.error('Failed to load vehicles', err)
    });
  }

  loadServiceCenters() {
    this.serviceCenterService.getAllServiceCenters().subscribe({
      next: (res) => {
        this.serviceCenters = res;
        this.filteredServiceCenters = [...res];
        const locations = res.map(sc => sc.serviceCenterLocation);
        this.uniqueLocations = [...new Set(locations)].sort();
      },
      error: (err) => console.error('Failed to load service centers', err)
    });
  }

  loadServiceTypes() {
    this.serviceTypeService.getAllServiceTypes().subscribe({
      next: (res) => {
        console.log('Service Types:', res); // Debugging line
        this.serviceTypes = res;
      },
      error: (err) => console.error('Failed to load service types', err)
    });
  }

  filterServiceCenters() {
    if (!this.selectedLocation) {
      this.filteredServiceCenters = [...this.serviceCenters];
    } else {
      this.filteredServiceCenters = this.serviceCenters.filter(
        sc => sc.serviceCenterLocation === this.selectedLocation
      );
    }
  }

  onServiceTypeChange(): void {
    console.log('Selected Service Type ID:', this.serviceBooking.serviceTypeId); // Debugging line
    console.log('Service Types:', this.serviceTypes); // Debugging line
  
    const selected = this.serviceTypes.find(
      (type) => type.serviceTypeid === +this.serviceBooking.serviceTypeId // Ensure type conversion
    );
  
    if (selected) {
      this.selectedPrice = selected.price;
      console.log('Selected Price:', this.selectedPrice); // Debugging line
    } else {
      this.selectedPrice = null;
      console.warn('No matching service type found.');
    }
  }

  onSubmit() {
    const { vehicleId, serviceCenterId, serviceTypeId, date, time } = this.serviceBooking;

    if (!vehicleId || !serviceCenterId || !serviceTypeId || !date || !time) {
      this.toastr.error('Please fill all fields correctly.', 'Validation Error');
      return;
    }

    const payload = {
      vehicleId: +vehicleId,
      serviceCenterId: +serviceCenterId,
      serviceTypeId: +serviceTypeId,
      date,
      timeSlot: time
    };

    this.bookingService.createBooking(payload).subscribe({
      next: () => {
        this.toastr.success('Service booked successfully!', 'Success');
        this.router.navigate(['/my-bookings']);
      },
      error: (err) => {
        console.error('Booking failed', err);
        this.toastr.error('Failed to book service. Please try again.', 'Error');
      }
    });
  }
}