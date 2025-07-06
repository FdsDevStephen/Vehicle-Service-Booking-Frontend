import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { BookingService } from '../../../shared/services/booking.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class UserDashboard implements OnInit {
  userName: string = '';
  greeting: string = '';
  vehicles: any[] = [];
  bookings: any[] = [];

  private userService = inject(UserService);
  private vehicleService = inject(VehicleService);
  private bookingService = inject(BookingService);

  ngOnInit(): void {
    this.setGreeting();
    this.loadUserProfile();
    this.loadVehicles();
    this.loadBookings();
  }

  private setGreeting(): void {
    const hour = new Date().getHours();
    this.greeting = hour < 12 ? 'Good Morning'
                  : hour < 15 ? 'Good Afternoon'
                  : 'Good Evening';
  }

  private loadUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        const rawName = res.name || res.fullName || 'User';
        this.userName = this.capitalizeName(rawName);
      },
      error: () => this.userName = 'User'
    });
  }

  private loadVehicles(): void {
    this.vehicleService.getUserVehicles().subscribe({
      next: (res) => this.vehicles = res,
      error: () => this.vehicles = []
    });
  }

  private loadBookings(): void {
    this.bookingService.getUserBookings().subscribe({
      next: (res) => {
        console.log(res)
        this.bookings = res;
      },
      error: () => this.bookings = []
    });
  }

  private capitalizeName(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
