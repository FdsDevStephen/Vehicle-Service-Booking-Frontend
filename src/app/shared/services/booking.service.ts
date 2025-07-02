import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private baseURL = 'http://localhost:5030/api/Booking';

  constructor(private http: HttpClient) {}

  // Create a new booking
  createBooking(payload: any): Observable<any> {
    return this.http.post(this.baseURL, payload);
  }

  // Fetch all bookings for logged-in user
  getUserBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL);
  }

  // Update booking status (for user-side action like cancel)
  updateBookingStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}/update-status-user`, { status });
  }

  updateBooking(id: number, payload: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, payload);
  }
 
  // Fetch a specific booking by ID
  getBookingById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/${id}`);
  }
 
}
