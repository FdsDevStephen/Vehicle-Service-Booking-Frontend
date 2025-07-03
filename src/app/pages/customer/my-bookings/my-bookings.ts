import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../shared/services/booking.service';
import { ServiceTypeService } from '../../../shared/services/service-type.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookings implements OnInit {
  bookings: any[] = [];
  pendingBookings: any[] = [];
  cancelledBookings: any[] = [];
  completedBookings: any[] = [];
 
  serviceTypes: any[] = [];
  editId: number | null = null;
  originalBooking: any = null;
  minDate: string = '';
 
  private bookingService = inject(BookingService);
  private serviceTypeService = inject(ServiceTypeService);
  private toastr = inject(ToastrService);
 
  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.loadBookings();
    this.loadServiceTypes();
  }
 
  loadBookings(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (res) => {
        console.log('Bookings:', res); // Debugging line
        this.bookings = res;
        this.pendingBookings = res.filter((b) => b.serviceStatus === 'Scheduled');
        this.cancelledBookings = res.filter((b) => b.serviceStatus === 'Cancelled'); // Adjusted filter condition
        this.completedBookings = res.filter((b) => b.serviceStatus === 'Completed'); // Adjusted filter condition
      },
      error: () => {
        this.bookings = [];
        this.pendingBookings = [];
        this.cancelledBookings = [];
        this.completedBookings = [];
      }
    });
  }
  loadServiceTypes(): void {
    this.serviceTypeService.getAllServiceTypes().subscribe({
      next: (res) => (this.serviceTypes = res),
      error: () => (this.serviceTypes = [])
    });
  }
 
  startEdit(booking: any): void {
    this.editId = booking.bookingId;
    this.originalBooking = { ...booking };
  }
 
  cancelEdit(): void {
    if (this.editId !== null) {
      const index = this.pendingBookings.findIndex((b) => b.bookingId === this.editId);
      if (index !== -1) {
        this.pendingBookings[index] = { ...this.originalBooking };
      }
    }
    this.editId = null;
    this.originalBooking = null;
  }
 
  saveEdit(booking: any): void {
    const updatePayload = {
      vehicleId: booking.vehicleId,
      serviceCenterId: booking.serviceCenterId,
      serviceTypeId: booking.serviceTypeId,
      date: booking.date,
      timeSlot: booking.timeSlot
    };
 
    this.bookingService.updateBooking(booking.bookingId, updatePayload).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'Booking updated successfully!');
        this.editId = null;
        this.loadBookings();
      },
      error: () => {
        this.toastr.error('Failed to update booking.');
      }
    });
  }
 
  cancelBooking(id: number): void {
    this.bookingService.updateBookingStatus(id, 'Cancelled').subscribe({
      next: () => {
        this.toastr.success('Booking cancelled.');
        this.loadBookings();
      },
      error: () => {
        this.toastr.error('Failed to cancel booking.');
      }
    });
  }
}
 