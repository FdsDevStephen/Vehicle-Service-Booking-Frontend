import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
export interface Invoice {
  invoiceId: number;
  bookingId: number;
  totalAmount: number;
  paymentStatus: string;
  paymentDate: string;
  serviceTypeDescription: string;
  bookingDate: string;
  bookingStatus: string;
}
 
@Injectable({ providedIn: 'root' })
export class InvoiceService {
private apiUrl = 'http://localhost:5030/api/Invoice';
 
  constructor(private http: HttpClient) {}
 
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }
 
  updatePaymentStatus(invoiceId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${invoiceId}/status`, { paymentStatus: status });
  }
 
  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }
}
 