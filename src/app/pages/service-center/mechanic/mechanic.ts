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

  deleteMechanic(id: number): void {
    console.log('Fetching mechanic with ID:', id); // Debugging line
  
    this.mechanicService.getMechanicById(id).subscribe({
      next: (mechanic) => {
        console.log('Mechanic fetched:', mechanic); // Debugging line
  
        if (confirm(`Are you sure you want to delete mechanic "${mechanic.mechanicName}"?`)) {
          this.mechanicService.deleteMechanic(id).subscribe({
            next: () => {
              console.log('Mechanic deleted successfully:', id); // Debugging line
              this.mechanics = this.mechanics.filter((m) => m.mechanicId !== id);
              alert('Mechanic deleted successfully.');
            },
            error: (err) => {
              console.error('Failed to delete mechanic:', err); // Debugging line
              alert(err?.error || 'Failed to delete mechanic.');
            },
          });
        }
      },
      error: (err) => {
        console.error('Failed to fetch mechanic:', err); // Debugging line
        alert('Failed to fetch mechanic. Cannot proceed with deletion.');
      },
    });
  }
}