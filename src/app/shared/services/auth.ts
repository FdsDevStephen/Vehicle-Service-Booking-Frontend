import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; // <--- Add PLATFORM_ID and Inject
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // <--- Add this import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // <--- Inject PLATFORM_ID
  ) { }

  baseURL = 'http://localhost:5030/api';

  createUser(formData: any): Observable<any> {
    const apiPayload = {
      Name: formData.fullName,
      Email: formData.email,
      Password: formData.password,
      Phone: formData.phoneNumber,
      Address: formData.address,
      Role: formData.role,
      ServiceCenterName: formData.serviceCenterName,
      ServiceCenterLocation: formData.serviceCenterLocation,
      ServiceCenterContact: formData.serviceCenterContact,
    };
    return this.http.post(this.baseURL + '/Account/register', apiPayload);
  }

  login(formData: any): Observable<any> {
    return this.http.post(this.baseURL + '/Auth/login', formData);
  }

  private getAuthHeaders() {
    // Conditionally access sessionStorage
    const token = this.getToken(); // Use getToken to handle platform check
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  getUserRoles(): string | null {
    const token = this.getToken(); // Use getToken to handle platform check
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role;
    } catch (e) {
      console.error('Failed to decode token payload', e);
      return null;
    }
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) { // <--- Add platform check
      sessionStorage.setItem('token', token);
    }
  }

  getToken(): string | null { // <--- New helper method
    if (isPlatformBrowser(this.platformId)) { // <--- Add platform check
      return sessionStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // <--- Use getToken
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) { // <--- Add platform check
      sessionStorage.removeItem('token');
    }
  }
}