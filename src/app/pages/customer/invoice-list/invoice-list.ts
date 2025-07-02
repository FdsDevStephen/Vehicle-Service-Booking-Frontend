import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Invoice, InvoiceService } from '../../../shared/services/invoice.service';
 
@Component({
  standalone: true,
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.html',
  styleUrls: ['./invoice-list.css'],

  imports: [CommonModule, CurrencyPipe],
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
 
  constructor(private invoiceService: InvoiceService, private router: Router) {}
 
  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }
 
  viewDetails(id: number) {
    this.router.navigate(['/invoice/detail', id]);
  }
}
 
 