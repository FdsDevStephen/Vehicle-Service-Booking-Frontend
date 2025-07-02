import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Invoice, InvoiceService } from '../../../shared/services/invoice.service';
import { BookingService } from '../../../shared/services/booking.service';
import { VehicleService } from '../../../shared/services/vehicle.service';
 
@Component({
  standalone: true,
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.html',
  styleUrls: ['./invoice-detail.css'],
  imports: [CommonModule, FormsModule]
})
export class InvoiceDetailComponent implements OnInit {
  invoiceId!: number;
  invoice!: Invoice;
  selectedStatus: string = '';
 
  booking: any;
  vehicle: any;
 
  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private bookingService: BookingService,
    private vehicleService: VehicleService
  ) {}
 
  ngOnInit(): void {
    this.invoiceId = +this.route.snapshot.paramMap.get('id')!;
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe(invoice => {
      this.invoice = invoice;
      this.selectedStatus = invoice.paymentStatus;
 
      // 🔁 Get booking by bookingId
      this.bookingService.getBookingById(invoice.bookingId).subscribe(booking => {
        console.log('Booking Response',booking);
        this.booking = booking;
       
 
        // 🔁 Get vehicle by booking.vehicleId
        this.vehicleService.getVehicleById(booking.vehicleId).subscribe(vehicle => {
          this.vehicle = vehicle;
        });
      });
    });
  }
 
  payInvoice() {
    this.invoiceService.updatePaymentStatus(this.invoiceId, 'Paid').subscribe(() => {
      alert('Payment successful');
      this.invoice.paymentStatus = 'Paid';
    });
  }
}
 
 