import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MechanicService, Mechanic, CreateMechanicDto } from '../../../shared/services/mechanic.service';

@Component({
  selector: 'app-mechanics',
  standalone: true,
  templateUrl: './mechanic.html',
  styleUrls: ['./mechanic.css'],
  imports: [CommonModule, RouterModule],
})
export class MechanicComponent implements OnInit {
  mechanics: Mechanic[] = [];
  isLoading = true;
  errorMessage = '';

  // Add dialog state
  showDeleteDialog = false;
  mechanicToDelete: Mechanic | null = null;

  constructor(private mechanicService: MechanicService) {}

  ngOnInit(): void {
    this.mechanicService.getMechanics().subscribe({
      next: (data) => {
        console.log('Mechanics:', data); // Debugging line
        this.mechanics = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load mechanics.';
        this.isLoading = false;
      },
    });
  }

  updateMechanic(id: number): void {
    const mechanicData: CreateMechanicDto = {
      mechanicName: prompt('Enter new mechanic name:') || '',
      expertise: prompt('Enter new expertise:') || '',
    };

    if (!mechanicData.mechanicName || !mechanicData.expertise) {
      alert('Both fields are required.');
      return;
    }

    this.mechanicService.updateMechanic(id, mechanicData).subscribe({
      next: (updatedMechanic) => {
        const index = this.mechanics.findIndex((m) => m.mechanicId === id);
        if (index !== -1) {
          this.mechanics[index] = updatedMechanic;
        }
        alert('Mechanic updated successfully.');
      },
      error: () => {
        alert('Failed to update mechanic.');
      },
    });
  }

  // Open the delete confirmation dialog
  openDeleteDialog(id: number): void {
    this.mechanicService.getMechanicById(id).subscribe({
      next: (mechanic) => {
        this.mechanicToDelete = mechanic;
        this.showDeleteDialog = true;
      },
      error: (err) => {
        console.error('Failed to fetch mechanic:', err);
        alert('Failed to fetch mechanic. Cannot proceed with deletion.');
      },
    });
  }

  // Close the dialog without deleting
  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.mechanicToDelete = null;
  }

  // Confirm deletion
  confirmDeleteMechanic(): void {
    if (!this.mechanicToDelete) return;
    const id = this.mechanicToDelete.mechanicId;
    this.mechanicService.deleteMechanic(id).subscribe({
      next: () => {
        this.mechanics = this.mechanics.filter((m) => m.mechanicId !== id);
        this.closeDeleteDialog();
      },
      error: (err) => {
        console.error('Failed to delete mechanic:', err);
        alert(err?.error || 'Failed to delete mechanic.');
        this.closeDeleteDialog();
      },
    });
  }
}