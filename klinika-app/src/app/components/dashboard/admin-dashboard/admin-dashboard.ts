import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Doctors } from '../../../services/doctors';
import { CommonModule } from '@angular/common';
import { Patients } from '../../../services/patients';
import { Nurses } from '../../../services/nurses';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];
  nurses: any[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private doctorsService: Doctors,
    private patientsService: Patients,
    private nursesService: Nurses,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit() {
    this.doctorsService.getAll().subscribe({
      next: (data) => {
        this.doctors = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.patientsService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.nursesService.getAll().subscribe({
      next: (data) => {
        this.nurses = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  deleteDoctor(id: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovog pacijenta?')) return;
    this.doctorsService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  deletePatient(id: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovog pacijenta?')) return;
    this.patientsService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  deleteNurse(id: number) {
    if (!confirm('Da li ste sigurni da želite da obrišete ovog pacijenta?')) return;
    this.nursesService.delete(id).subscribe({
      next: () => this.ngOnInit(),
      error: (err) => console.error(err)
    });
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}