import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceCenterService {
  private baseURL = 'http://localhost:5030/api';

  constructor(private http: HttpClient) {}

  getAllServiceCenters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/Booking/servicecenters`); // GET /api/ServiceCenter
  }
}