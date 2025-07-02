import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mechanic {
  mechanicId: number;
  mechanicName: string;
  expertise: string;
}

export interface CreateMechanicDto {
  mechanicName: string;
  expertise: string;
}

@Injectable({
  providedIn: 'root',
})
export class MechanicService {
  private apiUrl = 'http://localhost:5030/api/Mechanic'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getMechanics(): Observable<Mechanic[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<Mechanic[]>(`${this.apiUrl}/my-mechanics`, { headers });
  }

  updateMechanic(id: number, dto: CreateMechanicDto): Observable<Mechanic> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.put<Mechanic>(`${this.apiUrl}/${id}`, dto, { headers });
  }

  getMechanicById(id: number): Observable<Mechanic> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.get<Mechanic>(`${this.apiUrl}/${id}`, { headers });
  }

  deleteMechanic(id: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    });
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers });
  }
}