import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:5030/api/Vehicle'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to register a new vehicle
  registerVehicle(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Method to fetch all vehicles for a user
  getUserVehicles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  // Method to fetch a vehicle by ID
  getVehicleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Method to update a vehicle
  updateVehicle(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, { responseType: 'text' });
  }

  // Method to delete a vehicle
  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}