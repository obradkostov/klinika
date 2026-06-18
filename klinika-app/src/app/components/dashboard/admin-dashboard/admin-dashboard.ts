import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Doctors } from '../../../services/doctors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit{
  doctors:any[]=[];
   constructor(
    private authService: AuthService,
    private router: Router,
    private doctorsService: Doctors
  ) {}

  ngOnInit() {
    this.doctorsService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}