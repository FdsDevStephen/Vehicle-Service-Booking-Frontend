import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceCenterAppointmentsService, Appointment } from '../../../shared/services/appointment.service';

@Component({
  selector: 'app-service-center-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, RouterModule]
})
export class Dashboard implements OnInit {
  greeting: string = 'Stephen';
  userName: string = 'Service Center';
  appointments: Appointment[] = []; // Define the appointments property
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private appointmentsService: ServiceCenterAppointmentsService) {}

  ngOnInit(): void {
    this.setGreeting();
    this.loadAppointments();
  }

  /**
   * Sets a dynamic greeting based on the current time.
   */
  private setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  /**
   * Loads appointments from the service.
   */
  private loadAppointments(): void {
    const userId = 1; // Replace with the actual user ID (e.g., from auth service)
    this.appointmentsService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load appointments.';
        this.isLoading = false;
      }
    });
  }
}