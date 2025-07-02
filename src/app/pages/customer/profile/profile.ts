// ✅ profile.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  private userService = inject(UserService);
  private toastr = inject(ToastrService);

  profile: any = {};
  isServiceCenter: boolean = false;

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.isServiceCenter = !!res.serviceCenterName;
      },
      error: () => {
        this.toastr.error('Failed to load profile');
      }
    });
  }

  onUpdate(): void {
    this.userService.updateProfile(this.profile).subscribe({
      next: () => this.toastr.success('Profile updated successfully'),
      error: () => this.toastr.error('Failed to update profile')
    });
  }
}
