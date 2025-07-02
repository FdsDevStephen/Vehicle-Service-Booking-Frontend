import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-vehicles',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-vehicles.html',
  styleUrls: ['./my-vehicles.css']
})
export class MyVehicles implements OnInit {
  vehicles: any[] = [];
  editingVehicleId: number | null = null;
  editedVehicle: any = {};

  private vehicleService = inject(VehicleService);
  private toastr = inject(ToastrService);
  

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getUserVehicles().subscribe({
      next: (res) => this.vehicles = res,
      error: () => this.vehicles = []
    });
  }

  startEditing(vehicle: any): void {
    const confirmed = confirm('Are you sure you want to edit this vehicle?');
    if (!confirmed) return;

    this.editingVehicleId = vehicle.vehicleid;
    this.editedVehicle = { ...vehicle }; // clone to avoid binding directly
  }

  cancelEditing(): void {
    this.editingVehicleId = null;
    this.editedVehicle = {};
  }

  saveEdit(): void {
    this.vehicleService.updateVehicle(this.editingVehicleId!, this.editedVehicle).subscribe({
      next: () => {
        this.toastr.success('Vehicle updated successfully');
        this.loadVehicles();
        this.cancelEditing();
      },
      error: (err) => {
        console.log('Update failed:', err);
        this.toastr.error('Failed to update vehicle');
      }
    });
  }

  deleteVehicle(id: number): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => {
          this.toastr.success('Vehicle deleted successfully');
          this.loadVehicles();
        },
        error: (err) => {
          console.log('Delete failed:', err);
          this.toastr.error(err?.error || 'Failed to delete vehicle');
        }
      });
    }
  }
}