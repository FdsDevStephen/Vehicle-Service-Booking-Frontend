import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceType {
  id: number;
  description: string;
  price: number;
}

export interface CreateServiceTypeDto {
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService {
  private apiUrl = 'http://localhost:5030/api/ServiceType'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAllServiceTypes(): Observable<ServiceType[]> {
    const token = sessionStorage.getItem('token');
    console.log('Token:', token); // Debugging line
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Include token for authentication
    });
  
    return this.http.get<ServiceType[]>(this.apiUrl, { headers });
  }

  createServiceType(dto: CreateServiceTypeDto): Observable<ServiceType> {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    // });
    return this.http.post<ServiceType>(this.apiUrl, dto);
  }

  getCenterServiceTypes(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(`${this.apiUrl}`);
  }

  updateServiceType(id: number, dto: CreateServiceTypeDto): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, dto);
  }

  deleteServiceType(id: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers });
  }
}