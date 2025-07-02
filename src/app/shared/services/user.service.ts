import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseURL = 'http://localhost:5030/api/Account';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseURL}/Profile`);
  }

  updateProfile(payload: any): Observable<any> {
    return this.http.put(`${this.baseURL}/Profile`, payload);
  }
}